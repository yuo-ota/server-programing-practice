package jp.ac.dendai.spp.backend.dto;

public class BasePost {
  private String postId;
  private String iconPath;
  private Content content;

  // Getters and Setters
  public String getPostId() {
    return postId;
  }

  public void setPostId(String postId) {
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
