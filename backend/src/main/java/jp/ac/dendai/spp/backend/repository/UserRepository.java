package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
  @Query("SELECT u FROM User u WHERE u.emailAddress = :emailAddress")
  User findByEmailAddress(@Param("emailAddress") String emailAddress);

  @Query("SELECT u FROM User u WHERE u.userId = :userId")
  User findByUserId(@Param("userId") UUID userId);
}
