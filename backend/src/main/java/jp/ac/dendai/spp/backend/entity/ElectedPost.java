package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "elected_posts")
public class ElectedPost {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id")
  private UUID userId;

  @Column(name = "post_id")
  private UUID postId;

  @Column(name = "index")
  private int index;

  @Column(name = "delivered_at", columnDefinition = "TIMESTAMP WITH TIME ZONE")
  private ZonedDateTime deliveredAt;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public ElectedPost() {}

  public ElectedPost(UUID userId, UUID postId, int index, ZonedDateTime deliveredAt) {
    this.userId = userId;
    this.postId = postId;
    this.index = index;
    this.deliveredAt = deliveredAt;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

  public UUID getPostId() {
    return postId;
  }

  public int getIndex() {
    return index;
  }

  public ZonedDateTime getDeliveredAt() {
    return deliveredAt;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "ElectedPost{"
        + "id="
        + id
        + ", userId="
        + userId
        + ", postId="
        + postId
        + ", index="
        + index
        + ", deliveredAt="
        + deliveredAt
        + ", createdAt="
        + createdAt
        + '}';
  }
}
