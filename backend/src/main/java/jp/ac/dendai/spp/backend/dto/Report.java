package jp.ac.dendai.spp.backend.dto;

import java.util.UUID;

public class Report {
  private UUID id;
  private String reporter;
  private String summary;
  private String details;

  public Report(UUID id, String reporter, String summary, String details) {
    this.id = id;
    this.reporter = reporter;
    this.summary = summary;
    this.details = details;
  }

  // Getters and Setters
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getReporter() {
    return reporter;
  }

  public void setReporter(String reporter) {
    this.reporter = reporter;
  }

  public String getSummary() {
    return summary;
  }

  public void setSummary(String summary) {
    this.summary = summary;
  }

  public String getDetails() {
    return details;
  }

  public void setDetails(String details) {
    this.details = details;
  }
}
