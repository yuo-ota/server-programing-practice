package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "like_notifications")
public class LikeNotification {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "notification_id", nullable = false, unique = true)
  private UUID notificationId;

  @Column(name = "like_id", nullable = false, unique = true)
  private UUID likeId;

  // コンストラクタ
  public LikeNotification() {}

  public LikeNotification(UUID notificationId, UUID likeId) {
    this.notificationId = notificationId;
    this.likeId = likeId;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getNotificationId() {
    return notificationId;
  }

  public UUID getLikeId() {
    return likeId;
  }

  @Override
  public String toString() {
    return "LikeNotification{"
        + "id="
        + id
        + ", notificationId="
        + notificationId
        + ", likeId="
        + likeId
        + '}';
  }
}
