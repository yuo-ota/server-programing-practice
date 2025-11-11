package jp.ac.dendai.spp.backend.dto;

import java.util.UUID;

public class BasePost {
  private UUID postId;
  private String iconPath;
  private Content content;

  // Getters and Setters
  public UUID getPostId() {
    return postId;
  }

  public void setPostId(UUID postId) {
    this.postId = postId;
  }

  public String getIconPath() {
    return iconPath;
  }

  public void setIconPath(String iconPath) {
    this.iconPath = iconPath;
  }

  public Content getContent() {
    return content;
  }

  public void setContent(Content content) {
    this.content = content;
  }
}
