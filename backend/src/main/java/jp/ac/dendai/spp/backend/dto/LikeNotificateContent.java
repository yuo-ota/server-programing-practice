package jp.ac.dendai.spp.backend.dto;

public class LikeNotificateContent extends NotificateContent {
  private String likedPostId;
  private String likedByUserId;

  // Getters and Setters
  public String getLikedPostId() {
    return likedPostId;
  }

  public void setLikedPostId(String likedPostId) {
    this.likedPostId = likedPostId;
  }

  public String getLikedByUserId() {
    return likedByUserId;
  }

  public void setLikedByUserId(String likedByUserId) {
    this.likedByUserId = likedByUserId;
  }
}
