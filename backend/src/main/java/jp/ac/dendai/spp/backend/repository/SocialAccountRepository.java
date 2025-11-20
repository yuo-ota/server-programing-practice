package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SocialAccountRepository extends JpaRepository<SocialAccountEntity, UUID> {
  @Modifying
  @Transactional
  @Query("DELETE FROM SocialAccountEntity s WHERE s.userId = :userId")
  void deleteByUserId(@Param("userId") UUID userId);
}
