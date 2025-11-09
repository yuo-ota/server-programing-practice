package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "admin_users")
public class AdminUser {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private UUID userId;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public AdminUser() {}

  public AdminUser(UUID userId) {
    this.userId = userId;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "AdminUser{"
        + "id="
        + id
        + ", userId='"
        + userId
        + '\''
        + ", createdAt="
        + createdAt
        + '}';
  }
}
