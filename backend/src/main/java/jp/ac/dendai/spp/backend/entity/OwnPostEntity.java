package jp.ac.dendai.spp.backend.entity;

public class OwnPostEntity extends BasePostEntity {
  private int likeCount;

  public OwnPostEntity() {}

  public OwnPostEntity(
      java.util.UUID postId, String imagePath, String description, String alt, Long likeCount) {
    super(postId, description, alt, imagePath);
    this.likeCount = (likeCount != null) ? likeCount.intValue() : 0;
  }

  // Getters and Setters
  public int getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(int likeCount) {
    this.likeCount = likeCount;
  }
}
