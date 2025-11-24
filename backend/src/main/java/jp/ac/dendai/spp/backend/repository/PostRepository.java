package jp.ac.dendai.spp.backend.repository;

import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
  @Query(
      value =
          """
    SELECT * FROM posts WHERE creator_id = :creatorId
    AND EXTRACT(HOUR FROM created_at) >= :hour LIMIT 1
    """,
      nativeQuery = true)
  Post findByCreatorId(@Param("creatorId") UUID creatorId, @Param("hour") int hour);
}
