package jp.ac.dendai.spp.backend.constant;

import java.util.Map;

public class PenaltyConstant {
  public static final Map<Integer, String> PLATFORM_MAP =
      Map.of(
          0, "投稿停止",
          2, "いいね停止",
          1, "閲覧停止");
}
