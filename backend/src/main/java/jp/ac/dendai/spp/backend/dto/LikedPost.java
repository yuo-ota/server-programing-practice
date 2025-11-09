package jp.ac.dendai.spp.backend.dto;

public class LikedPost extends BasePost {
  private String userId;
  private String name;

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
