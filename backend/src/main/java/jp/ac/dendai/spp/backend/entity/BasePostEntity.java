package jp.ac.dendai.spp.backend.entity;

import java.util.UUID;

public class BasePostEntity {
  private UUID postId;
  private String description;
  private String alt;
  private String imagePath;

  public BasePostEntity() {}

  public BasePostEntity(UUID postId, String description, String alt, String imagePath) {
    this.postId = postId;
    this.description = description;
    this.alt = alt;
    this.imagePath = imagePath;
  }

  // Getters and Setters
  public UUID getPostId() {
    return postId;
  }

  public void setPostId(UUID postId) {
    this.postId = postId;
  }

  public String getImagePath() {
    return imagePath;
  }

  public void setImagePath(String imagePath) {
    this.imagePath = imagePath;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAlt() {
    return alt;
  }

  public void setAlt(String alt) {
    this.alt = alt;
  }
}
