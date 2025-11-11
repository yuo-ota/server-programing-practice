package jp.ac.dendai.spp.backend.dto;

public class OwnPost extends BasePost {
  private int likeCount;

  public OwnPost() {
  }

  public OwnPost(java.util.UUID postId, String iconPath, Content content, int likeCount) {
    super(postId, iconPath, content);
    this.likeCount = likeCount;
  }

  // Getters and Setters
  public int getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(int likeCount) {
    this.likeCount = likeCount;
  }
}
