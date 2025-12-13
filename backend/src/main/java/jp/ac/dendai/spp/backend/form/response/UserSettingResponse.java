package jp.ac.dendai.spp.backend.form.response;

import java.time.LocalDate;

public class UserSettingResponse {
  private String displayId;
  private String name;
  private String iconPath;
  private String headerPath;
  private String introduction;
  private LocalDate birthday;
  private boolean showAdultContent;

  // Getters and Setters
  public String getDisplayId() {
    return displayId;
  }

  public void setDisplayId(String displayId) {
    this.displayId = displayId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIconPath() {
    return iconPath;
  }

  public void setIconPath(String iconPath) {
    this.iconPath = iconPath;
  }

  public String getHeaderPath() {
    return headerPath;
  }

  public void setHeaderPath(String headerPath) {
    this.headerPath = headerPath;
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

  public boolean isShowAdultContent() {
    return showAdultContent;
  }

  public void setShowAdultContent(boolean showAdultContent) {
    this.showAdultContent = showAdultContent;
  }
}
