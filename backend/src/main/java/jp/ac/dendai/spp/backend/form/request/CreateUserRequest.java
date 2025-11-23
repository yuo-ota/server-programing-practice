package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import jp.ac.dendai.spp.backend.dto.SocialAccount;

public class CreateUserRequest {
  @NotBlank
  private String token;

  @NotBlank
  private String name;

  @Past(message = "誕生日は過去の日付で設定してください。")
  private LocalDate birthday;
  private boolean showAdultContents;
  private List<SocialAccount> socialAccounts;

  @NotBlank
  @Size(min = 3, max = 15, message = "ユーザーIDは3文字以上15文字以下で設定してください。")
  @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "ユーザーIDは英数字とアンダースコア(_)のみ使用できます。")
  private String userId;

  // Getters and Setters
  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public LocalDate getBirthday() {
    return birthday;
  }

  public void setBirthday(LocalDate birthday) {
    this.birthday = birthday;
  }

  public boolean getShowAdultContents() {
    return showAdultContents;
  }

  public void setShowAdultContents(boolean showAdultContents) {
    this.showAdultContents = showAdultContents;
  }

  public List<SocialAccount> getSocialAccounts() {
    return socialAccounts;
  }

  public void setSocialAccounts(List<SocialAccount> socialAccounts) {
    this.socialAccounts = socialAccounts;
  }
}
