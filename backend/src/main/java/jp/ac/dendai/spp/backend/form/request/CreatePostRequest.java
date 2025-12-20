package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public class CreatePostRequest {

  @Size(max = 140)
  private String text;

  @NotNull
  @Size(min = 1, max = 1, message = "画像は1枚以上1枚以下で設定してください。")
  private List<MultipartFile> images;

  @NotNull private String sensitive;

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

  public String getSensitive() {
    return sensitive;
  }

  public void setSensitive(String sensitive) {
    this.sensitive = sensitive;
  }
}
