package jp.ac.dendai.spp.backend.constant;

import java.util.Map;

public class ImageConstant {
  public static final String TYPE_HEADER = "header";
  public static final String TYPE_ICON = "icon";
  public static final String TYPE_WORKS = "works";

  public static final Map<String, String> IMAGE_TYPE_MAP =
      Map.of(
          TYPE_HEADER, "/images/headers",
          TYPE_ICON, "/images/icons",
          TYPE_WORKS, "/images/works");
}
