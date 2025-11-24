package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.ImageConstant;
import jp.ac.dendai.spp.backend.constant.PostConstant;
import jp.ac.dendai.spp.backend.dto.Image;
import jp.ac.dendai.spp.backend.entity.ElectedPost;
import jp.ac.dendai.spp.backend.entity.ImageEntity;
import jp.ac.dendai.spp.backend.entity.Post;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreatePostRequest;
import jp.ac.dendai.spp.backend.form.response.ShowPostResponse;
import jp.ac.dendai.spp.backend.repository.ElectedPostRepository;
import jp.ac.dendai.spp.backend.repository.ImageRepository;
import jp.ac.dendai.spp.backend.repository.PostRepository;
import jp.ac.dendai.spp.backend.util.ImageManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PostService {
  private final PostRepository postRepository;
  private final ImageRepository imageRepository;
  private final ElectedPostRepository electedPostRepository;

  private final AuthService authService;

  public PostService(
      PostRepository postRepository,
      ImageRepository imageRepository,
      ElectedPostRepository electedPostRepository,
      AuthService authService) {
    this.postRepository = postRepository;
    this.imageRepository = imageRepository;
    this.electedPostRepository = electedPostRepository;
    this.authService = authService;
  }

  /**
   * 指定されたユーザーの投稿を上書き投稿する
   *
   * @param userId
   * @param request
   */
  @Transactional
  public void createPost(UUID userId, CreatePostRequest request) {
    overwritePost(userId);

    boolean isSensitive = Boolean.parseBoolean(request.getSensitive());
    Post post = new Post(userId, request.getText(), isSensitive, false);
    Post savedPost = postRepository.save(post);

    List<ImageEntity> imageEntities = new ArrayList<>();
    for (int i = 0; i < request.getImages().size(); i++) {
      MultipartFile imageDto = request.getImages().get(i);
      String imagePath;

      try {
        imagePath = ImageManager.processAndSaveImage(imageDto, ImageConstant.TYPE_WORKS);
      } catch (Exception e) {
        throw new InvalidParameterException("Failed to process work image", e);
      }

      ImageEntity imageEntity = new ImageEntity(savedPost.getId(), i, imagePath, "");
      imageEntities.add(imageEntity);
    }

    imageRepository.saveAll(imageEntities);
  }

  /**
   * 指定されたユーザーの指定された日の投稿を取得する
   *
   * @param userId
   * @param date
   * @return
   */
  public List<ShowPostResponse> showPost(UUID userId, LocalDate date) {
    checkValidDate(date);

    List<ElectedPost> electedPosts = electedPostRepository.findByUserIdAndDate(userId, date);

    List<ShowPostResponse> responses = new ArrayList<>();
    for (ElectedPost post : electedPosts) {
      responses.add(convertToShowPostResponse(userId, post.getPostId()));
    }

    return responses;
  }

  /**
   * 指定された投稿IDの投稿を取得する
   *
   * @param postId
   * @return
   */
  public ShowPostResponse showSinglePost(UUID userId, UUID postId) {
    return convertToShowPostResponse(userId, postId);
  }

  /**
   * 指定された投稿を削除する
   *
   * @param userId
   * @param postId
   */
  public void deletePost(UUID userId, UUID postId) {
    Post post = getPostById(postId);

    postRepository.delete(post);
  }

  /**
   * 指定された日付が有効かどうかをチェックする
   *
   * @param date
   */
  public void checkValidDate(LocalDate date) {
    LocalDate today = LocalDate.now();
    LocalTime nowTime = LocalTime.now();

    if (nowTime.isBefore(PostConstant.DATE_CHANGE_TIME)) {
      today = today.minusDays(1);
    }

    if (date.isBefore(today.minusDays(PostConstant.DAYS_VIEWABLE_TRACEBACK))
        || date.isAfter(today)) {
      throw new InvalidParameterException("指定された日付は閲覧できません。");
    }
  }

  /**
   * ElectedPostをShowPostResponseに変換する
   *
   * @param postId
   * @return
   */
  public ShowPostResponse convertToShowPostResponse(UUID userId, UUID postId) {
    ShowPostResponse response = new ShowPostResponse();

    Post post = getPostById(postId);
    checkValidPost(userId, post);

    String displayId = authService.getDisplayIdByUserId(post.getCreatorId());
    List<ImageEntity> images = imageRepository.findByPostId(postId);
    List<Image> imageDtos = new ArrayList<>();

    response.setUserId(displayId);
    response.setPostId(post.getId());
    response.setText(post.getDescription());
    for (ImageEntity imageEntity : images) {
      imageDtos.add(convertToImageDto(imageEntity));
    }
    response.setImages(imageDtos);

    return response;
  }

  /**
   * ImageEntityをImage DTOに変換する
   *
   * @param imageEntity
   * @return
   */
  public Image convertToImageDto(ImageEntity imageEntity) {
    Image image = new Image();
    image.setPath(imageEntity.getPath());
    image.setAlt(imageEntity.getAlt());
    return image;
  }

  /**
   * 指定されたユーザーの投稿を上書きする
   *
   * @param userId
   */
  public void overwritePost(UUID userId) {
    Post existingPosts =
        postRepository.findByCreatorId(userId, PostConstant.DATE_CHANGE_TIME.getHour());

    if (existingPosts == null) {
      return;
    }
    postRepository.delete(existingPosts);
  }

  /**
   * 指定された投稿IDの投稿を取得する
   *
   * @param postId
   * @return
   */
  public Post getPostById(UUID postId) {
    if (postId == null) {
      throw new InvalidParameterException("投稿IDが指定されていません。");
    }

    Post post = postRepository.findById(postId).orElse(null);
    if (post == null) {
      throw new InvalidParameterException("指定された投稿は存在しません。");
    }
    return post;
  }

  /**
   * 指定された投稿が有効かどうかをチェックする
   *
   * @param userId
   * @param post
   */
  public void checkValidPost(UUID userId, Post post) {
    if (post.getDeletedAt() != null) {
      throw new InvalidParameterException("指定された投稿は削除されています。");
    }

    if (post.getCreatorId().equals(userId)) {
      return;
    }

    if (!post.isPublished()) {
      throw new InvalidParameterException("指定された投稿は公開されていません。");
    }
  }
}
