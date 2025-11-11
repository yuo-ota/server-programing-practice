package jp.ac.dendai.spp.backend.form.request;

import java.util.UUID;

public class DeleteLikeRequest {
  private UUID postId;

  // Getters and Setters
  public UUID getPostId() {
    return postId;
  }

  public void setPostId(UUID postId) {
    this.postId = postId;
  }
}
