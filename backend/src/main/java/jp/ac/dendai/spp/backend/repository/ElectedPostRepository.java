package jp.ac.dendai.spp.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.ElectedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectedPostRepository extends JpaRepository<ElectedPost, UUID> {
  @Query(
      "SELECT e FROM ElectedPost e WHERE e.userId = :userId AND e.deliveredAt >= :startOfDay AND e.deliveredAt < :startOfNextDay ORDER BY e.index ASC")
  List<ElectedPost> findByUserIdAndDeliveredAtBetween(
      @Param("userId") UUID userId,
      @Param("startOfDay") java.time.LocalDateTime startOfDay,
      @Param("startOfNextDay") java.time.LocalDateTime startOfNextDay);
}
