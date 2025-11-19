package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Duration;
import java.util.UUID;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken extends BaseToken {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private UUID userId;

  // コンストラクタ
  public PasswordResetToken() {
    super();
  }

  public PasswordResetToken(UUID userId, String token, Duration duration) {
    super(token, duration);
    this.userId = userId;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

  @Override
  public String toString() {
    return "PasswordResetToken{"
        + "id="
        + id
        + ", userId='"
        + userId
        + ", token='"
        + getToken()
        + ", createdAt="
        + getCreatedAt()
        + '}';
  }
}
