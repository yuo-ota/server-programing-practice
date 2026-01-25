package jp.ac.dendai.spp.backend.dto;

public class OwnPost extends BasePost {
  private int likeCount;
  private boolean isLiked;

  public OwnPost() {}

  public OwnPost(
      java.util.UUID postId, String iconPath, Content content, int likeCount, boolean isLiked) {
    super(postId, iconPath, content);
    this.likeCount = likeCount;
    this.isLiked = isLiked;
  }

  // Getters and Setters
  public int getLikeCount() {
    return likeCount;
  }

  public void setLikeCount(int likeCount) {
    this.likeCount = likeCount;
  }

  public boolean isLiked() {
    return isLiked;
  }

  public void setLiked(boolean liked) {
    isLiked = liked;
  }
}
