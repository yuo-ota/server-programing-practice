package jp.ac.dendai.spp.backend.service;

import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.NotificationConstant;
import jp.ac.dendai.spp.backend.entity.Like;
import jp.ac.dendai.spp.backend.entity.LikeNotification;
import jp.ac.dendai.spp.backend.entity.Notification;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.repository.LikeNotificationRepository;
import jp.ac.dendai.spp.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final LikeNotificationRepository likeNotificationRepository;

  public NotificationService(
      NotificationRepository notificationRepository,
      LikeNotificationRepository likeNotificationRepository) {
    this.notificationRepository = notificationRepository;
    this.likeNotificationRepository = likeNotificationRepository;
  }

  /**
   * 通知の作成
   *
   * @param notificationCategory
   * @param userId
   * @return
   */
  public Notification createNotification(int notificationCategory, UUID userId) {
    Notification notification = new Notification(notificationCategory, userId);
    Notification savedNotification = notificationRepository.save(notification);

    return savedNotification;
  }

  /**
   * 通知の削除
   *
   * @param notificationId
   * @return
   */
  public Notification deleteNotification(UUID notificationId) {
    Notification notification = notificationRepository.findById(notificationId).orElseThrow();
    notificationRepository.delete(notification);
    return notification;
  }

  /**
   * いいね通知の作成
   *
   * @param userId
   * @param like
   * @return
   */
  public LikeNotification createLikeNotification(UUID userId, Like like) {
    Notification notification =
        createNotification(NotificationConstant.NOTIFICATION_CATEGORY_MAP.get("いいね通知"), userId);
    LikeNotification likeNotification = new LikeNotification(notification.getId(), like.getId());

    LikeNotification savedLikeNotification = likeNotificationRepository.save(likeNotification);

    return savedLikeNotification;
  }

  /**
   * いいね通知の削除
   *
   * @param likeId
   * @return
   */
  public Notification deleteLikeNotification(UUID likeId) {
    LikeNotification likeNotification = likeNotificationRepository.findByLikeId(likeId);

    if (likeNotification == null) {
      throw new InvalidParameterException("いいね通知が見つかりません。");
    }

    return deleteNotification(likeNotification.getNotificationId());
  }
}
