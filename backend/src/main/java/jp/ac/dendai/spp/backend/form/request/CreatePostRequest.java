package jp.ac.dendai.spp.backend.form.request;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public class CreatePostRequest {
  private String text;
  private List<MultipartFile> images;

  // Getters and Setters
  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public List<MultipartFile> getImages() {
    return images;
  }

  public void setImages(List<MultipartFile> images) {
    this.images = images;
  }
}
