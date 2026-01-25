package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "penalties")
public class Penalty {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "penalty_status_id", nullable = false)
  private int penaltyStatusId;

  @Column(name = "penalized_user_id", nullable = false)
  private UUID penalizedUserId;

  @Column(name = "admin_user_id")
  private UUID adminUserId;

  @Column(name = "duration_value")
  private Integer durationValue;

  @Column(name = "duration_unit", nullable = false)
  private String durationUnit;

  @Column(name = "reason", nullable = false)
  private String reason;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public Penalty() {}

  public Penalty(
      int penaltyStatusId,
      UUID penalizedUserId,
      UUID adminUserId,
      Integer durationValue,
      String durationUnit,
      String reason) {
    this.penaltyStatusId = penaltyStatusId;
    this.penalizedUserId = penalizedUserId;
    this.adminUserId = adminUserId;
    this.durationValue = durationValue;
    this.durationUnit = durationUnit;
    this.reason = reason;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public int getPenaltyStatusId() {
    return penaltyStatusId;
  }

  public UUID getPenalizedUserId() {
    return penalizedUserId;
  }

  public UUID getAdminUserId() {
    return adminUserId;
  }

  public Integer getDurationValue() {
    return durationValue;
  }

  public String getDurationUnit() {
    return durationUnit;
  }

  public String getReason() {
    return reason;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "Penalty{"
        + "id="
        + id
        + ", penaltyStatusId="
        + penaltyStatusId
        + ", penalizedUserId="
        + penalizedUserId
        + ", adminUserId="
        + adminUserId
        + ", durationValue="
        + durationValue
        + ", durationUnit='"
        + durationUnit
        + '\''
        + ", reason='"
        + reason
        + '\''
        + ", createdAt="
        + createdAt
        + '}';
  }
}
