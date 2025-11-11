package jp.ac.dendai.spp.backend.form.response;

import java.time.ZonedDateTime;
import java.util.UUID;

import jp.ac.dendai.spp.backend.dto.NotificateContent;

public class NotificationResponse {
  private UUID notificateId;
  private String notificateType;
  private ZonedDateTime date;
  private NotificateContent content;

  // Getters and Setters
  public UUID getNotificateId() {
    return notificateId;
  }

  public void setNotificateId(UUID notificateId) {
    this.notificateId = notificateId;
  }

  public String getNotificateType() {
    return notificateType;
  }

  public void setNotificateType(String notificateType) {
    this.notificateType = notificateType;
  }

  public ZonedDateTime getDate() {
    return date;
  }

  public void setDate(ZonedDateTime date) {
    this.date = date;
  }

  public NotificateContent getContent() {
    return content;
  }

  public void setContent(NotificateContent content) {
    this.content = content;
  }
}
