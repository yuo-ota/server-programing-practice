package jp.ac.dendai.spp.backend.dto;

public class Content {
  private String description;
  private String path;
  private String alt;

  public Content() {
  }

  public Content(String description, String path, String alt) {
    this.description = description;
    this.path = path;
    this.alt = alt;
  }

  // Getters and Setters
  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getAlt() {
    return alt;
  }

  public void setAlt(String alt) {
    this.alt = alt;
  }
}
