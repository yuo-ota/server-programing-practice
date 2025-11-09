package jp.ac.dendai.spp.backend.form.request;

public class AuthRequest {
  private String token;
  private String pathType;

  // Getters and Setters
  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public String getPathType() {
    return pathType;
  }

  public void setPathType(String pathType) {
    this.pathType = pathType;
  }
}
