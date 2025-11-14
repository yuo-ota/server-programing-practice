package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "creator_id")
  private UUID creatorId;

  @Column(name = "description")
  private String description;

  @Column(name = "is_sensitive", nullable = false)
  private boolean isSensitive;

  @Column(name = "is_published", nullable = false)
  private boolean isPublished;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  @Column(name = "deleted_at", insertable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
  private ZonedDateTime deletedAt;

  // コンストラクタ
  public Post() {}

  public Post(UUID creatorId, String description, boolean isSensitive, boolean isPublished) {
    this.creatorId = creatorId;
    this.description = description;
    this.isSensitive = isSensitive;
    this.isPublished = isPublished;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getCreatorId() {
    return creatorId;
  }

  public String getDescription() {
    return description;
  }

  public boolean isSensitive() {
    return isSensitive;
  }

  public boolean isPublished() {
    return isPublished;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  public ZonedDateTime getDeletedAt() {
    return deletedAt;
  }

  @Override
  public String toString() {
    return "Post{"
        + "id="
        + id
        + ", creatorId="
        + creatorId
        + ", description='"
        + description
        + '\''
        + ", isSensitive="
        + isSensitive
        + ", isPublished="
        + isPublished
        + '\''
        + ", createdAt="
        + createdAt
        + ", deletedAt="
        + deletedAt
        + '}';
  }
}
