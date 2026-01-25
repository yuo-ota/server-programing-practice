package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

  /**
   * 指定したユーザーIDの通知リストを取得し、作成日時が新しい順で返す。
   *
   * @param userId 通知を取得対象のユーザーID
   * @return 該当ユーザーの通知リスト（createdAt 降順）
   */
  @Query("SELECT n FROM Notification n WHERE n.userId = :userId ORDER BY n.createdAt DESC LIMIT 50")
  List<Notification> findByUserId(@Param("userId") UUID userId);
}
