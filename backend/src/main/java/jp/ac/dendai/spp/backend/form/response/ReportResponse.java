package jp.ac.dendai.spp.backend.form.response;

import java.util.List;
import jp.ac.dendai.spp.backend.dto.Report;

public class ReportResponse {
  private List<Report> reports;

  // Getters and Setters
  public List<Report> getReports() {
    return reports;
  }

  public void setReports(List<Report> reports) {
    this.reports = reports;
  }
}
