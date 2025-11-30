package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID> {
  @Query("SELECT l FROM Like l WHERE l.userId = :userId AND l.postId = :postId")
  public Like findByUserIdAndPostId(@Param("userId") UUID userId, @Param("postId") UUID postId);
}
