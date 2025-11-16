package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "penalty_notifications")
public class PenaltyNotification {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "notification_id", nullable = false, unique = true)
  private UUID notificationId;

  @Column(name = "penalty_id", nullable = false, unique = true)
  private UUID penaltyId;

  // コンストラクタ
  public PenaltyNotification() {}

  public PenaltyNotification(UUID notificationId, UUID penaltyId) {
    this.notificationId = notificationId;
    this.penaltyId = penaltyId;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getNotificationId() {
    return notificationId;
  }

  public UUID getPenaltyId() {
    return penaltyId;
  }

  @Override
  public String toString() {
    return "PenaltyNotification{"
        + "id="
        + id
        + ", notificationId="
        + notificationId
        + ", penaltyId="
        + penaltyId
        + '}';
  }
}
