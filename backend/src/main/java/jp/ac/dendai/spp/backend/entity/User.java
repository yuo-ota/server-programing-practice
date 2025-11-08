package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue
  @Column(name = "user_id", insertable = false, updatable = false)
  private UUID userId;

  @Column(name = "email_address", nullable = false, unique = true, length = 255)
  private String emailAddress;

  @Column(name = "password", nullable = false, length = 255)
  private String password;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  @Column(
      name = "updated_at",
      nullable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime updatedAt;

  // コンストラクタ
  public User() {}

  public User(String emailAddress, String hashedPassword) {
    this.emailAddress = emailAddress;
    this.password = hashedPassword;
  }

  // Getter, Setter
  public UUID getUserId() {
    return userId;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String hashedPassword) {
    this.password = hashedPassword;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  public ZonedDateTime getUpdatedAt() {
    return updatedAt;
  }

  @Override
  public String toString() {
    return "User{"
        + "userId="
        + userId
        + ", emailAddress='"
        + emailAddress
        + '\''
        + ", createdAt="
        + createdAt
        + ", updatedAt="
        + updatedAt
        + '}';
  }
}
