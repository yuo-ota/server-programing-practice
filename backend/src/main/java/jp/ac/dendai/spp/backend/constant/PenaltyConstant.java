package jp.ac.dendai.spp.backend.constant;

import java.util.Map;

public class PenaltyConstant {
  public static final Map<Integer, String> PLATFORM_MAP =
      Map.of(
          0, "投稿停止",
          1, "閲覧停止",
          2, "いいね停止");

  public static final String DAYS = "days";
  public static final String WEEKS = "weeks";
  public static final String MONTHS = "months";
  public static final String YEARS = "years";
  public static final String UNLIMITED = "unlimited";
}
