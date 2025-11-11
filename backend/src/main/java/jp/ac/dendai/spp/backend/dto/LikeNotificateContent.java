package jp.ac.dendai.spp.backend.dto;

import java.util.UUID;

public class LikeNotificateContent extends NotificateContent {
  private UUID likedPostId;
  private String likedByUserId;

  // Getters and Setters
  public UUID getLikedPostId() {
    return likedPostId;
  }

  public void setLikedPostId(UUID likedPostId) {
    this.likedPostId = likedPostId;
  }

  public String getLikedByUserId() {
    return likedByUserId;
  }

  public void setLikedByUserId(String likedByUserId) {
    this.likedByUserId = likedByUserId;
  }
}
