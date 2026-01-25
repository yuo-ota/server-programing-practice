package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Penalty;
import jp.ac.dendai.spp.backend.entity.PenaltyNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PenaltyNotificationRepository extends JpaRepository<PenaltyNotification, UUID> {
  /**
   * 通知IDから処分通知を取得する。
   *
   * @param notificationId 通知ID
   * @return 該当する処分通知
   */
  @Query(
      value =
          """
            SELECT p.*
            FROM penalty_notifications AS pn
            LEFT JOIN penalties AS p ON pn.penalty_id= p.id
            WHERE pn.notification_id=:notificationId
            LIMIT 1
            """,
      nativeQuery = true)
  Penalty findByNotificationId(@Param("notificationId") UUID notificationId);
}
