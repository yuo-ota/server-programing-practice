package jp.ac.dendai.spp.backend.repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.LikedPostEntity;
import jp.ac.dendai.spp.backend.entity.OwnPostEntity;
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
  Post findByCreatorIdInToday(@Param("creatorId") UUID creatorId, @Param("hour") int hour);

  @Query("SELECT p FROM Post p WHERE p.creatorId = :creatorId")
  List<Post> findByCreatorId(@Param("creatorId") UUID creatorId);

  @Query(
      value =
          """
            SELECT p.id, i.path AS image_path, p.description, i.alt, l.like_count
            FROM posts AS p
            LEFT JOIN (
                SELECT post_id, path, alt
                FROM images
                WHERE index = 1
            ) AS i
            ON p.id = i.post_id
            LEFT JOIN (
                SELECT post_id, COUNT(post_id) AS like_count
                FROM likes
                GROUP BY likes.post_id
            ) AS l
            ON p.id = l.post_id
            WHERE p.creator_id = :creatorId
            AND p.is_published = true
            """,
      nativeQuery = true)
  List<OwnPostEntity> findByOwnPost(@Param("creatorId") UUID creatorId);

  @Query(
      value =
          """
            SELECT id FROM posts
            WHERE created_at BETWEEN :startDateTime AND :endDateTime
            """,
      nativeQuery = true)
  List<UUID> findPostIdsByCreatedAtBetween(
      @Param("startDateTime") ZonedDateTime startDateTime,
      @Param("endDateTime") ZonedDateTime endDateTime);

  @Query(
      value =
          """
            SELECT p.id, p.description, i.path, i.alt, us.display_id AS user_id,
            us.name, us.icon_path
            FROM likes AS l
            LEFT JOIN (
                SELECT id, creator_id, description
                FROM posts
            ) AS p
            ON l.post_id = p.id
            LEFT JOIN (
                SELECT post_id, path, alt
                FROM images
                WHERE index = 1
            ) AS i
            ON l.post_id = i.post_id
            LEFT JOIN user_settings AS us
            ON p.creator_id = us.user_id
            WHERE l.user_id = :userId
            """,
      nativeQuery = true)
  List<LikedPostEntity> findByLikedPost(@Param("userId") UUID userId);

  @Query(
      value =
          """
            SELECT id FROM posts
            WHERE created_at BETWEEN :startDateTime AND :endDateTime
            AND is_sensitive = false
            """,
      nativeQuery = true)
  List<UUID> findPostIdsByCreatedAtBetweenAndNotSensitive(
      @Param("startDateTime") ZonedDateTime startDateTime,
      @Param("endDateTime") ZonedDateTime endDateTime);
}
