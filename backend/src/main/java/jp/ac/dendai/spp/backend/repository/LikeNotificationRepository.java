package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.dto.LikeNotificateContent;
import jp.ac.dendai.spp.backend.entity.LikeNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeNotificationRepository extends JpaRepository<LikeNotification, UUID> {
  @Query("SELECT l FROM LikeNotification l WHERE l.likeId = :likeId")
  LikeNotification findByLikeId(@Param("likeId") UUID likeId);

  @Query(
      value =
          """
      SELECT l.post_id AS liked_post_id, us.display_id AS liked_by_user_id
      FROM like_notifications AS ln
      LEFT JOIN likes AS l
      ON ln.like_id = l.id
      LEFT JOIN user_settings AS us
      ON l.user_id = us.user_id
      WHERE ln.notification_id = :notificationId
      LIMIT 1
      """,
      nativeQuery = true)
  LikeNotificateContent findByNotificationId(@Param("notificationId") UUID notificationId);
}
