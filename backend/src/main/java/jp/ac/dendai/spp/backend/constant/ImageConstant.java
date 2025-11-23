package jp.ac.dendai.spp.backend.constant;

import java.util.Map;

public class ImageConstant {
  public static final String TYPE_HEADER = "header";
  public static final String TYPE_ICON = "icon";
  public static final String TYPE_WORKS = "works";

  public static final int MAX_FILENAME_GENERATION_ATTEMPTS = 10;
  public static final java.util.Set<String> ALLOWED_EXTENSIONS =
      new java.util.HashSet<>(java.util.Arrays.asList("png", "jpg", "jpeg", "webp", "heic"));
  public static final long MAX_FILE_SIZE_BYTES = 5L * 1024L * 1024L;

  public static final Map<String, String> IMAGE_TYPE_MAP =
      Map.of(
          TYPE_HEADER, "/images/headers",
          TYPE_ICON, "/images/icons",
          TYPE_WORKS, "/images/works");
}
