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
@Table(name = "pre_register_tokens")
public class PreRegisterToken {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "email_address", nullable = false, unique = true, length = 255)
  private String emailAddress;

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
  public PreRegisterToken() {}

  public PreRegisterToken(String emailAddress, String token, Duration duration) {
    this.emailAddress = emailAddress;
    this.token = token;
    this.duration = duration;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public String getEmailAddress() {
    return emailAddress;
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
    return "PreRegisterTokens{"
        + "id="
        + id
        + ", emailAddress='"
        + emailAddress + '\''
        + ", token='"
        + token + '\''
        + ", createdAt="
        + createdAt
        + '}';
  }
}
