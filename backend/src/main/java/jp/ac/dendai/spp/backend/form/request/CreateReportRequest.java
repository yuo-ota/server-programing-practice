package jp.ac.dendai.spp.backend.form.request;

public class CreateReportRequest {
  private String reportUser;

  private String reporteePost;
  private String reportType;
  private String detail;

  // Getters and Setters
  public String getReportUser() {
    return reportUser;
  }

  public void setReportUser(String reportUser) {
    this.reportUser = reportUser;
  }

  public String getReporteePost() {
    return reporteePost;
  }

  public void setReporteePost(String reporteePost) {
    this.reporteePost = reporteePost;
  }

  public String getReportType() {
    return reportType;
  }

  public void setReportType(String reportType) {
    this.reportType = reportType;
  }

  public String getDetail() {
    return detail;
  }

  public void setDetail(String detail) {
    this.detail = detail;
  }
}
