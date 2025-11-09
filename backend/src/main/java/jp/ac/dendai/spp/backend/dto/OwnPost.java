package jp.ac.dendai.spp.backend.dto;

public class OwnPost extends BasePost {
  private int likeCount;

  // Getters and Setters
  public int getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(int likeCount) {
    this.likeCount = likeCount;
  }
}
