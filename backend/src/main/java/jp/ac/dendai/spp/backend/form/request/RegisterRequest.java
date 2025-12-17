package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

  @NotBlank @Email private String emailAddress;

  @NotBlank
  @Size(min = 8)
  @Pattern(
      regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$",
      message = "パスワードは英字・数字・記号をそれぞれ1文字以上含めてください。")
  private String password;

  // Getters and Setters
  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
