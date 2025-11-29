package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialAccountRepository extends JpaRepository<SocialAccountEntity, UUID> {
  @Modifying
  @Query("DELETE FROM SocialAccountEntity s WHERE s.userId = :userId")
  void deleteByUserId(@Param("userId") UUID userId);

  @Query("SELECT s FROM  SocialAccountEntity s WHERE s.userId = :userId")
  List<SocialAccountEntity> findByUserId(@Param("userId") UUID userId);
}
