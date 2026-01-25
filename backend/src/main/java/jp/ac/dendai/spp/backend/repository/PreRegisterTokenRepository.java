package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PreRegisterTokenRepository extends JpaRepository<PreRegisterToken, UUID> {
  @Query("SELECT t FROM PreRegisterToken t WHERE t.token = :token")
  public PreRegisterToken findByToken(@Param("token") String token);
}
