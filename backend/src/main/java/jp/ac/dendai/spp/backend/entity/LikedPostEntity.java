package jp.ac.dendai.spp.backend.entity;

import java.util.UUID;

public class LikedPostEntity extends BasePostEntity {
  private String userId;
  private String name;
  private String iconPath;

  public LikedPostEntity() {}

  public LikedPostEntity(
      UUID postId,
      String imagePath,
      String description,
      String alt,
      String userId,
      String name,
      String iconPath) {
    super(postId, description, alt, imagePath);
    this.userId = userId;
    this.name = name;
    this.iconPath = iconPath;
  }

  // Getters and Setters
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIconPath() {
    return iconPath;
  }

  public void setIconPath(String iconPath) {
    this.iconPath = iconPath;
  }
}
