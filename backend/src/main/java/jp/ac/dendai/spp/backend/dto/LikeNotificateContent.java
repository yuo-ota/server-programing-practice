package jp.ac.dendai.spp.backend.dto;

import java.util.UUID;

public class LikeNotificateContent extends NotificateContent {
  private UUID likedPostId;
  private String likedByUserId;
  private String likedByUsername;

  public LikeNotificateContent() {}

  public LikeNotificateContent(UUID likedPostId, String likedByUserId, String likedByUsername) {
    this.likedPostId = likedPostId;
    this.likedByUserId = likedByUserId;
    this.likedByUsername = likedByUsername;
  }

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

  public String getLikedByUsername() {
    return likedByUsername;
  }

  public void setLikedByUsername(String likedByUsername) {
    this.likedByUsername = likedByUsername;
  }
}
