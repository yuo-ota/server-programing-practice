package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, UUID> {
  @Query("SELECT u FROM UserSetting u WHERE u.displayId = :displayId")
  UserSetting findByDisplayId(@Param("displayId") String displayId);

  @Query("SELECT u FROM UserSetting u WHERE u.userId = :userId")
  UserSetting findByUserId(@Param("userId") UUID userId);
}
