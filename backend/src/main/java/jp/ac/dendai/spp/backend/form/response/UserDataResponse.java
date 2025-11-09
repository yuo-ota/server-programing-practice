package jp.ac.dendai.spp.backend.form.response;

import java.util.List;
import jp.ac.dendai.spp.backend.dto.LikedPost;
import jp.ac.dendai.spp.backend.dto.OwnPost;

public class UserDataResponse {
  private String name;
  private String iconPath;
  private String headerPath;
  private List<OwnPost> posts;
  private List<LikedPost> likedPosts;

  // Getters and Setters
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIconPath() {
    return iconPath;
  }

  public void setIconPath(String iconPath) {
    this.iconPath = iconPath;
  }

  public String getHeaderPath() {
    return headerPath;
  }

  public void setHeaderPath(String headerPath) {
    this.headerPath = headerPath;
  }

  public List<OwnPost> getPosts() {
    return posts;
  }

  public void setPosts(List<OwnPost> posts) {
    this.posts = posts;
  }

  public List<LikedPost> getLikedPosts() {
    return likedPosts;
  }

  public void setLikedPosts(List<LikedPost> likedPosts) {
    this.likedPosts = likedPosts;
  }
}
