package jp.ac.dendai.spp.backend.service;

import java.util.Optional;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Like;
import jp.ac.dendai.spp.backend.entity.Post;
import jp.ac.dendai.spp.backend.form.request.LikeRequest;
import jp.ac.dendai.spp.backend.repository.LikeRepository;
import jp.ac.dendai.spp.backend.repository.PostRepository;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
  private final NotificationService notificationService;
  private final LikeRepository likeRepository;
  private final PostRepository postRepository;

  public LikeService(NotificationService notificationService, LikeRepository likeRepository, PostRepository postRepository) {
    this.notificationService = notificationService;
    this.likeRepository = likeRepository;
    this.postRepository = postRepository;
  }

  /**
   * いいねの作成とそれに伴う通知の作成
   *
   * @param userId
   * @param request
   */
  @Transactional
  public void createLike(UUID userId, LikeRequest request) {
    Like like = new Like(userId, request.getPostId());
    Optional<Post> post = postRepository.findById(request.getPostId());

    if (post.isEmpty()) {
      throw new InvalidParameterException("投稿が見つかりません。");
    }

    Like savedLike = likeRepository.save(like);

    notificationService.createLikeNotification(post.get().getCreatorId(), savedLike);
  }

  /**
   * いいねの削除とそれに伴う通知の削除
   *
   * @param userId
   * @param request
   */
  @Transactional
  public void deleteLike(UUID userId, LikeRequest request) {
    Like like = likeRepository.findByUserIdAndPostId(userId, request.getPostId());

    if (like == null) {
      throw new InvalidParameterException("いいねが見つかりません。");
    }

    likeRepository.delete(like);
    notificationService.deleteLikeNotification(like.getId());
  }
}
