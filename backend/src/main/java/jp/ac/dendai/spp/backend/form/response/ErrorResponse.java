package jp.ac.dendai.spp.backend.form.response;

public class ErrorResponse {
  private String code;
  private String message;

  // Getters and Setters
  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
