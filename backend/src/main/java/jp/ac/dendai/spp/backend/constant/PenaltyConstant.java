package jp.ac.dendai.spp.backend.constant;

import java.util.List;

public class PenaltyConstant {
  public static final String POSTING_SUSPENSION = "投稿停止";
  public static final String VIEWING_SUSPENSION = "閲覧停止";
  public static final String LIKE_SUSPENSION = "いいね停止";
  public static final List<String> PLATFORM_LIST =
      List.of(POSTING_SUSPENSION, VIEWING_SUSPENSION, LIKE_SUSPENSION);

  public static final String DAYS = "days";
  public static final String WEEKS = "weeks";
  public static final String MONTHS = "months";
  public static final String YEARS = "years";
  public static final String UNLIMITED = "unlimited";
}
