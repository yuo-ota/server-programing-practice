package jp.ac.dendai.spp.backend.entity;

import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private UUID userId;

  @Column(name = "token", nullable = false, length = 64)
  private String token;

  @Column(name = "duration", nullable = false)
  @Type(PostgreSQLIntervalType.class)
  private Duration duration;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public PasswordResetToken() {}

  public PasswordResetToken(UUID userId, String token, Duration duration) {
    this.userId = userId;
    this.token = token;
    this.duration = duration;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

  public String getToken() {
    return token;
  }

  public Duration getDuration() {
    return duration;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "PasswordResetToken{"
        + "id="
        + id
        + ", userId='"
        + userId
        + ", token='"
        + token
        + ", createdAt="
        + createdAt
        + '}';
  }
}
