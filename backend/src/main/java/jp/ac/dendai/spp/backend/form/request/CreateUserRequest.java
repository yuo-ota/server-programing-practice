package jp.ac.dendai.spp.backend.form.request;

public class CreateUserRequest {
  private String token;
  private String name;
  private String userId;
  private String birthday;
  private boolean showAdultContents;

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

  public String getBirthday() {
    return birthday;
  }

  public void setBirthday(String birthday) {
    this.birthday = birthday;
  }

  public boolean getShowAdultContents() {
    return showAdultContents;
  }

  public void setShowAdultContents(boolean showAdultContents) {
    this.showAdultContents = showAdultContents;
  }
}
