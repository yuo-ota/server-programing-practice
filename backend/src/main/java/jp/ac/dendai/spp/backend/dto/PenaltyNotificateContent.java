package jp.ac.dendai.spp.backend.dto;

import java.time.LocalDate;

public class PenaltyNotificateContent extends NotificateContent {
  private String category;
  private String detail;
  private String duration;
  private String type;
  private LocalDate endDate;

  public PenaltyNotificateContent() {
  }

  public PenaltyNotificateContent(String category, String detail, String duration, String type, LocalDate endDate) {
    this.category = category;
    this.detail = detail;
    this.duration = duration;
    this.type = type;
    this.endDate = endDate;
  }

  // Getters and Setters
  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDetail() {
    return detail;
  }

  public void setDetail(String detail) {
    this.detail = detail;
  }

  public String getDuration() {
    return duration;
  }

  public void setDuration(String duration) {
    this.duration = duration;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
