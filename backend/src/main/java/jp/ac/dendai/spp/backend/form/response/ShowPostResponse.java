package jp.ac.dendai.spp.backend.form.response;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.dto.Image;

public class ShowPostResponse {
  private String userId;
  private UUID postId;
  private String text;
  private List<Image> images;

  // Getters and Setters
  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public UUID getPostId() {
    return postId;
  }

  public void setPostId(UUID postId) {
    this.postId = postId;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public List<Image> getImages() {
    return images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }
}
