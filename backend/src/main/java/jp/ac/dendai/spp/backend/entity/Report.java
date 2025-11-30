package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "reports")
public class Report {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "reporter")
  private UUID reporter;

  @Column(name = "is_report_user", nullable = false)
  private boolean isReportUser;

  @Column(name = "reportee")
  private UUID reportee;

  @Column(name = "reported_post_id")
  private UUID reportedPostId;

  @Column(name = "category_status_id", nullable = false)
  private List<Integer> categoryStatusId;

  @Column(name = "details")
  private String details;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  @Column(name = "deleted_at", insertable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
  private ZonedDateTime deletedAt;

  // コンストラクタ
  public Report() {}

  public Report(
      UUID reporter,
      boolean isReportUser,
      UUID reportee,
      UUID reportedPostId,
      List<Integer> categoryStatusId,
      String details) {
    this.reporter = reporter;
    this.isReportUser = isReportUser;
    this.reportee = reportee;
    this.reportedPostId = reportedPostId;
    this.categoryStatusId = List.copyOf(categoryStatusId);
    this.details = details;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getReporter() {
    return reporter;
  }

  public boolean isReportUser() {
    return isReportUser;
  }

  public UUID getReportee() {
    return reportee;
  }

  public UUID getReportedPostId() {
    return reportedPostId;
  }

  public List<Integer> getCategoryStatusId() {
    return List.copyOf(categoryStatusId);
  }

  public String getDetails() {
    return details;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "Report{"
        + "id="
        + id
        + ", reporter="
        + reporter
        + ", isReportUser="
        + isReportUser
        + ", reportee="
        + reportee
        + ", reportedPostId="
        + reportedPostId
        + ", categoryStatusId="
        + categoryStatusId
        + ", details="
        + details
        + ", createdAt="
        + createdAt
        + '}';
  }
}
