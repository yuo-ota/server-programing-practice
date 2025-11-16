package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "images")
public class Image {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "post_id", nullable = false)
  private UUID postId;

  @Column(name = "index", nullable = false)
  private int index;

  @Column(name = "path", nullable = false)
  private String path;

  @Column(name = "alt")
  private String alt;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  // コンストラクタ
  public Image() {}

  public Image(UUID postId, int index, String path, String alt) {
    this.postId = postId;
    this.index = index;
    this.path = path;
    this.alt = alt;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getPostId() {
    return postId;
  }

  public int getIndex() {
    return index;
  }

  public String getPath() {
    return path;
  }

  public String getAlt() {
    return alt;
  }

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  @Override
  public String toString() {
    return "Image{"
        + "id="
        + id
        + ", postId="
        + postId
        + ", index="
        + index
        + ", path='"
        + path
        + ", alt='"
        + alt
        + ", createdAt="
        + createdAt
        + '}';
  }
}
