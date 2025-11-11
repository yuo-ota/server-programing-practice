package jp.ac.dendai.spp.backend.form.response;

import java.util.List;
import jp.ac.dendai.spp.backend.dto.Image;

public class ShowPostResponse {
  private String text;
  private List<Image> images;

  // Getters and Setters
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
