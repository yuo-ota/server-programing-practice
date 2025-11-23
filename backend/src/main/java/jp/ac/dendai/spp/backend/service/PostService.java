package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
import org.springframework.stereotype.Service;

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

  public void createPost(UUID userId, CreatePostRequest request) {
    // TODO: 投稿作成のロジックをここに実装
  }

  public List<ShowPostResponse> showPost(UUID userId, LocalDate date) {
    checkValidDate(date);

    List<ElectedPost> electedPosts = electedPostRepository.findByUserIdAndDate(userId, date);

    List<ShowPostResponse> responses = new ArrayList<>();
    for (ElectedPost post : electedPosts) {
      System.out.println(post);
      responses.add(convertToShowPostResponse(post.getPostId()));
    }

    return responses;
  }

  /**
   * 指定された日付が有効かどうかをチェックする
   *
   * @param date
   */
  public void checkValidDate(LocalDate date) {
    LocalDate today = LocalDate.now();

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
  public ShowPostResponse convertToShowPostResponse(UUID postId) {
    ShowPostResponse response = new ShowPostResponse();

    Post post = postRepository.findByPostId(postId);
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
}
