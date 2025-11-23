package jp.ac.dendai.spp.backend.form.request;

import java.time.LocalDate;

public class ShowPostRequest {
  private LocalDate date;

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }
}
