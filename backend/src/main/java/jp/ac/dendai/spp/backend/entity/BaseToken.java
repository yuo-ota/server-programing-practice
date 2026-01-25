package jp.ac.dendai.spp.backend.entity;

import io.hypersistence.utils.hibernate.type.interval.PostgreSQLIntervalType;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.time.Duration;
import java.time.ZonedDateTime;
import org.hibernate.annotations.Type;

@MappedSuperclass
public class BaseToken {

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

  public BaseToken() {}

  public BaseToken(String token, Duration duration) {
    this.token = token;
    this.duration = duration;
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
}
