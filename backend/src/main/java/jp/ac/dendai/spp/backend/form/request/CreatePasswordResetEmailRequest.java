package jp.ac.dendai.spp.backend.form.request;

public class CreatePasswordResetEmailRequest {
  private String emailAddress;

  // Getters and Setters
  public String getEmailAddress() {
    return emailAddress;
  }

  public void setEmailAddress(String emailAddress) {
    this.emailAddress = emailAddress;
  }
}
