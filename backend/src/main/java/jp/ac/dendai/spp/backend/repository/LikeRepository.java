package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
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
            SELECT COUNT(*)
            FROM likes
            WHERE post_id = ANY(:postIds)
            GROUP BY post_id
            ORDER BY array_position(:postIds, post_id)
            """,
      nativeQuery = true)
  List<Integer> countBypostIds(@Param("postIds") List<UUID> postIds);

  @Query("SELECT l.postId FROM Like l WHERE l.userId = :userId ORDER BY l.createdAt DESC")
  List<UUID> findPostIdsByUserId(@Param("userId") UUID userId);
}
