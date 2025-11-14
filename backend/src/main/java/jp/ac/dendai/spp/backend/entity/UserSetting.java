package jp.ac.dendai.spp.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_settings")
public class UserSetting {

  @Id
  @GeneratedValue
  @Column(name = "id", insertable = false, updatable = false)
  private UUID id;

  @Column(name = "user_id", nullable = false, unique = true)
  private UUID userId;

  @Column(name = "display_id", nullable = false, unique = true, length = 15)
  private String displayId;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "icon_path", insertable = false)
  private String iconPath;

  @Column(name = "header_path", insertable = false)
  private String headerPath;

  @Column(name = "introduction")
  private String introduction;

  @Column(name = "birthday")
  private LocalDate birthday;

  @Column(name = "show_adult_content", nullable = false)
  private boolean showAdultContent;

  @Column(
      name = "created_at",
      nullable = false,
      updatable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime createdAt;

  @Column(
      name = "updated_at",
      nullable = false,
      insertable = false,
      columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime updatedAt;

  // コンストラクタ
  public UserSetting() {}

  public UserSetting(
      UUID userId, String name, String displayId, LocalDate birthday, boolean showAdultContent) {
    this.userId = userId;
    this.name = name;
    this.displayId = displayId;
    this.birthday = birthday;
    this.showAdultContent = showAdultContent;
  }

  // Getter, Setter
  public UUID getId() {
    return id;
  }

  public UUID getUserId() {
    return userId;
  }

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

  public ZonedDateTime getCreatedAt() {
    return createdAt;
  }

  public ZonedDateTime getUpdatedAt() {
    return updatedAt;
  }

  @Override
  public String toString() {
    return "UserSetting{"
        + "id="
        + id
        + ", userId="
        + userId
        + ", displayId='"
        + displayId
        + ", name='"
        + name
        + '\''
        + ", introduction='"
        + introduction
        + '\''
        + ", birthday='"
        + birthday
        + ", createdAt="
        + createdAt
        + ", updatedAt="
        + updatedAt
        + '}';
  }
}
