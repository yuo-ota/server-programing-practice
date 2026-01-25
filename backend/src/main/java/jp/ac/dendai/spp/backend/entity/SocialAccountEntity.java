package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "social_accounts")
public class SocialAccountEntity {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false)
  private UUID userId;

  @Column(name = "platform_id", nullable = false)
  private int platformId;

  @Column(name = "link", nullable = false)
  private String link;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public SocialAccountEntity() {}

  public SocialAccountEntity(UUID userId, int platformId, String link) {
    this.userId = userId;
    this.platformId = platformId;
    this.link = link;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

  public int getPlatformId() {
    return platformId;
  }

  public String getLink() {
    return link;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "SocialAccounts{"
        + "id="
        + id
        + ", userId="
        + userId
        + ", platformId="
        + platformId
        + ", link='"
        + link
        + '\''
        + ", createdAt="
        + createdAt
        + '}';
  }
}
