package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;

public class CreatePenaltyRequest {
  @NotBlank(message = "type is required")
  private String type;

  @NotBlank(message = "penalizedUserId is required")
  private String penalizedUserId;

  private Integer duration;

  @NotBlank(message = "durationUnit is required")
  @Pattern(
      regexp = "^(days|weeks|months|years|unlimited)$",
      message = "durationUnit must be one of days, weeks, months, or years")
  private String durationUnit;

  @NotBlank(message = "reason is required")
  private String reason;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getPenalizedUserId() {
    return penalizedUserId;
  }

  public void setPenalizedUserId(String penalizedUserId) {
    this.penalizedUserId = penalizedUserId;
  }

  public Integer getDuration() {
    return duration;
  }

  public void setDuration(Integer duration) {
    this.duration = duration;
  }

  public String getDurationUnit() {
    return durationUnit;
  }

  public void setDurationUnit(String durationUnit) {
    this.durationUnit = durationUnit;
  }

  public String getReason() {
    return reason;
  }

  public void setReason(String reason) {
    this.reason = reason;
  }
}
