package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import org.springframework.web.multipart.MultipartFile;

public class UpdateUserRequest {
  @NotBlank private String name;

  private MultipartFile icon;
  private List<SocialAccount> socialAccounts;

  @Size(max = 200, message = "自己紹介は200文字以下で設定してください。")
  private String introduction;

  @Past(message = "誕生日は過去の日付で設定してください。")
  private LocalDate birthday;

  private boolean showAdultContents;

  @Size(min = 3, max = 15, message = "ユーザーIDは3文字以上15文字以下で設定してください。")
  @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "ユーザーIDは英数字とアンダースコア(_)のみ使用できます。")
  private String userId;

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

  public MultipartFile getIcon() {
    return icon;
  }

  public void setIcon(MultipartFile icon) {
    this.icon = icon;
  }

  public List<SocialAccount> getSocialAccounts() {
    return socialAccounts;
  }

  public void setSocialAccounts(List<SocialAccount> socialAccounts) {
    this.socialAccounts = socialAccounts;
  }

  public String getIntroduction() {
    return introduction;
  }

  public void setIntroduction(String introduction) {
    this.introduction = introduction;
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
}
