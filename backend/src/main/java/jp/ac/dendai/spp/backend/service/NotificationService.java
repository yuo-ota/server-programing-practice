package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.NotificationConstant;
import jp.ac.dendai.spp.backend.constant.PenaltyConstant;
import jp.ac.dendai.spp.backend.dto.LikeNotificateContent;
import jp.ac.dendai.spp.backend.dto.PenaltyNotificateContent;
import jp.ac.dendai.spp.backend.entity.Like;
import jp.ac.dendai.spp.backend.entity.LikeNotification;
import jp.ac.dendai.spp.backend.entity.Notification;
import jp.ac.dendai.spp.backend.entity.Penalty;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.response.NotificationResponse;
import jp.ac.dendai.spp.backend.repository.LikeNotificationRepository;
import jp.ac.dendai.spp.backend.repository.NotificationRepository;
import jp.ac.dendai.spp.backend.repository.PenaltyNotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final LikeNotificationRepository likeNotificationRepository;
  private final PenaltyNotificationRepository penaltyNotificationRepository;

  public NotificationService(
      NotificationRepository notificationRepository,
      LikeNotificationRepository likeNotificationRepository,
      PenaltyNotificationRepository penaltyNotificationRepository) {
    this.notificationRepository = notificationRepository;
    this.likeNotificationRepository = likeNotificationRepository;
    this.penaltyNotificationRepository = penaltyNotificationRepository;
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

  /**
   * ユーザーIDから通知リストを取得してレスポンス形式に変換する。
   *
   * @param userId 通知を取得するユーザーID
   * @return 通知レスポンスのリスト
   */
  public List<NotificationResponse> show(UUID userId) {
    List<Notification> notifications = notificationRepository.findByUserId(userId);

    if (notifications.isEmpty()) {
      return new ArrayList<>();
    }

    List<NotificationResponse> responses = new ArrayList<>();
    for (Notification notification : notifications) {
      NotificationResponse response = buildNotificationResponse(notification);
      if (response != null) {
        responses.add(response);
      }
    }

    return responses;
  }

  /**
   * Notification エンティティから NotificationResponse を構築する。
   *
   * @param notification 通知エンティティ
   * @return 通知レスポンス（該当データがない場合は null）
   */
  private NotificationResponse buildNotificationResponse(Notification notification) {
    NotificationResponse response = new NotificationResponse();
    response.setNotificateId(notification.getId());
    response.setDate(notification.getCreatedAt());

    int categoryStatusId = notification.getCategoryStatusId();

    // カテゴリに応じて通知タイプとコンテンツを設定
    if (categoryStatusId == NotificationConstant.NOTIFICATION_CATEGORY_MAP.get("いいね通知")) {
      response.setNotificateType("いいね通知");

      // いいね通知の詳細情報を取得
      LikeNotificateContent content =
          likeNotificationRepository.findByNotificationId(notification.getId());
      response.setContent(content);

    } else if (categoryStatusId == NotificationConstant.NOTIFICATION_CATEGORY_MAP.get("処分通知")) {
      response.setNotificateType("処分通知");

      Penalty penalty = penaltyNotificationRepository.findByNotificationId(notification.getId());
      if (penalty != null) {
        String category = PenaltyConstant.PLATFORM_LIST.get(penalty.getPenaltyStatusId());
        String detail = penalty.getReason();
        String duration = calculateDuration(penalty.getDurationValue(), penalty.getDurationUnit());
        LocalDate endDate =
            calculateEndDate(
                penalty.getCreatedAt(), penalty.getDurationValue(), penalty.getDurationUnit());

        PenaltyNotificateContent content =
            new PenaltyNotificateContent(category, detail, duration, endDate);
        response.setContent(content);
      }
    }

    return response;
  }

  /**
   * 処分期間の文字列を生成する。
   *
   * @param durationValue 期間の値
   * @param durationUnit 期間の単位
   * @return 期間の文字列表現
   */
  private String calculateDuration(Integer durationValue, String durationUnit) {
    if (durationUnit.equals(PenaltyConstant.UNLIMITED)) {
      return "無期限";
    }
    if (durationValue == null) {
      return "";
    }
    String unit =
        switch (durationUnit) {
          case PenaltyConstant.DAYS -> "日";
          case PenaltyConstant.WEEKS -> "週間";
          case PenaltyConstant.MONTHS -> "ヶ月";
          case PenaltyConstant.YEARS -> "年";
          default -> "";
        };
    return durationValue + unit;
  }

  /**
   * 処分の終了日を計算する。
   *
   * @param createdAt 処分開始日時
   * @param durationValue 期間の値
   * @param durationUnit 期間の単位
   * @return 処分終了日（無期限の場合は null）
   */
  private LocalDate calculateEndDate(
      java.time.ZonedDateTime createdAt, Integer durationValue, String durationUnit) {
    if (durationUnit.equals(PenaltyConstant.UNLIMITED) || durationValue == null) {
      return null;
    }

    LocalDate startDate = createdAt.toLocalDate();
    return switch (durationUnit) {
      case PenaltyConstant.DAYS -> startDate.plusDays(durationValue);
      case PenaltyConstant.WEEKS -> startDate.plusWeeks(durationValue);
      case PenaltyConstant.MONTHS -> startDate.plusMonths(durationValue);
      case PenaltyConstant.YEARS -> startDate.plusYears(durationValue);
      default -> null;
    };
  }
}
