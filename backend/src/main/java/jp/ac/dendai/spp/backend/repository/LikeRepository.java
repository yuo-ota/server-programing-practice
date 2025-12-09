package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.dto.PostIdAndCount;
import jp.ac.dendai.spp.backend.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID> {
  @Query(
      value =
          """
      SELECT post_id, COUNT(*)
      FROM likes
      WHERE post_id IN :postIds
      GROUP BY post_id
      """,
      nativeQuery = true)
  List<PostIdAndCount> countByPostIds(@Param("postIds") UUID[] postIds);

  @Query("SELECT l.postId FROM Like l WHERE l.userId = :userId ORDER BY l.createdAt DESC")
  List<UUID> findPostIdsByUserId(@Param("userId") UUID userId);

  @Query("SELECT l FROM Like l WHERE l.userId = :userId AND l.postId = :postId")
  public Like findByUserIdAndPostId(@Param("userId") UUID userId, @Param("postId") UUID postId);
}
