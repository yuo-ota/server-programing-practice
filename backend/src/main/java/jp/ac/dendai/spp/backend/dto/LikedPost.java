package jp.ac.dendai.spp.backend.dto;

import java.util.UUID;

public class LikedPost extends BasePost {
  private String userId;
  private String name;

  public LikedPost() {}

  public LikedPost(UUID postId, String iconPath, Content content, String userId, String name) {
    super(postId, iconPath, content);
    this.userId = userId;
    this.name = name;
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
}
