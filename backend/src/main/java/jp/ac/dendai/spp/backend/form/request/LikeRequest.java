package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class LikeRequest {
  @NotNull private UUID postId;

  // Getters and Setters
  public UUID getPostId() {
    return postId;
  }

  public void setPostId(UUID postId) {
    this.postId = postId;
  }
}
