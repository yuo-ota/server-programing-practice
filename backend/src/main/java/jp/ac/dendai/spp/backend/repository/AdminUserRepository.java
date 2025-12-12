package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, UUID> {
  /**
   * 指定したユーザーIDが管理者かどうかを確認する。
   *
   * @param userId 確認対象のユーザーID
   * @return 管理者の場合は AdminUser、そうでない場合は null
   */
  @Query("SELECT a FROM AdminUser a WHERE a.userId = :userId")
  AdminUser findByUserId(@Param("userId") UUID userId);
}
