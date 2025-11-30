package jp.ac.dendai.spp.backend.form.request;

import jakarta.validation.constraints.NotEmpty;
import java.util.UUID;

public class CreateReportRequest {
  private String reporteeUser;
  private UUID reporteePost;

  @NotEmpty private String[] reportType;
  private String detail;

  // Getters and Setters
  public String getReporteeUser() {
    return reporteeUser;
  }

  public void setReporteeUser(String reporteeUser) {
    this.reporteeUser = reporteeUser;
  }

  public UUID getReporteePost() {
    return reporteePost;
  }

  public void setReporteePost(UUID reporteePost) {
    this.reporteePost = reporteePost;
  }

  public String[] getReportType() {
    return reportType.clone();
  }

  public void setReportType(String[] reportType) {
    this.reportType = reportType.clone();
  }

  public String getDetail() {
    return detail;
  }

  public void setDetail(String detail) {
    this.detail = detail;
  }
}
