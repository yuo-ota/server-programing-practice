package jp.ac.dendai.spp.backend.repository;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, UUID> {
  @Query("SELECT i FROM ImageEntity i WHERE i.postId = :postId ORDER BY i.index ASC")
  List<ImageEntity> findByPostId(@Param("postId") UUID postId);

  @Query("SELECT i FROM ImageEntity i WHERE i.postId IN :postIds AND i.index = 0")
  List<ImageEntity> findByPostIds(@Param("postIds") List<UUID> postIds);
}
