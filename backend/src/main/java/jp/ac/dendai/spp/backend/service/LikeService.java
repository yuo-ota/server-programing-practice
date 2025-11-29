package jp.ac.dendai.spp.backend.service;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Like;
import jp.ac.dendai.spp.backend.form.request.LikeRequest;
import jp.ac.dendai.spp.backend.repository.LikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
  private final NotificationService notificationService;
  private final LikeRepository likeRepository;

  public LikeService(NotificationService notificationService, LikeRepository likeRepository) {
    this.notificationService = notificationService;
    this.likeRepository = likeRepository;
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

    Like savedLike = likeRepository.save(like);

    notificationService.createLikeNotification(userId, savedLike);
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

    likeRepository.delete(like);

    notificationService.deleteLikeNotification(like.getId());
  }
}
