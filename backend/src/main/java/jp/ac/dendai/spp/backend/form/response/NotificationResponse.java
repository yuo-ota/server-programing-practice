package jp.ac.dendai.spp.backend.form.response;

import jp.ac.dendai.spp.backend.dto.NotificateContent;

public class NotificationResponse {
  private String notificateId;
  private String notificateType;
  private String date;
  private NotificateContent content;

  // Getters and Setters
  public String getNotificateId() {
    return notificateId;
  }

  public void setNotificateId(String notificateId) {
    this.notificateId = notificateId;
  }

  public String getNotificateType() {
    return notificateType;
  }

  public void setNotificateType(String notificateType) {
    this.notificateType = notificateType;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public NotificateContent getContent() {
    return content;
  }

  public void setContent(NotificateContent content) {
    this.content = content;
  }
}
