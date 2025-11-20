package jp.ac.dendai.spp.backend.form.request;

import java.time.LocalDate;
import java.util.List;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import org.springframework.web.multipart.MultipartFile;

public class UpdateUserRequest {
  private String userId;
  private String name;
  private MultipartFile icon;
  private MultipartFile header;
  private List<SocialAccount> socialAccounts;
  private String introduction;
  private LocalDate birthday;
  private boolean showAdultContents;

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

  public MultipartFile getHeader() {
    return header;
  }

  public void setHeader(MultipartFile header) {
    this.header = header;
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
