package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Duration;
import java.util.UUID;

@Entity
@Table(name = "pre_register_tokens")
public class PreRegisterToken extends BaseToken {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "email_address", nullable = false, unique = true, length = 255)
  private String emailAddress;

  @Column(name = "password", nullable = false, length = 255)
  private String password;

  // コンストラクタ
  public PreRegisterToken() {
    super();
  }

  public PreRegisterToken(String emailAddress, String token, Duration duration) {
    super(token, duration);
    this.emailAddress = emailAddress;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public String getPassword() {
    return password;
  }

  @Override
  public String toString() {
    return "PreRegisterTokens{"
        + "id="
        + id
        + ", emailAddress='"
        + emailAddress
        + '\''
        + ", token='"
        + getToken()
        + '\''
        + ", createdAt="
        + getCreatedAt()
        + '}';
  }
}
