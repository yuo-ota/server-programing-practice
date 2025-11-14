package jp.ac.dendai.spp.backend.constant;

import java.util.Map;

public class ReportConstant {
  public static final Map<Integer, String> REPORT_POST_CATEGORIES_MAP =
      Map.of(
          0, "不適切な公開制限",
          1, "ヘイト",
          2, "攻撃的な行為や嫌がらせ",
          3, "暴力的な発言",
          4, "プライバシーの侵害",
          5, "スパムやなりすまし",
          6, "その他");

  public static final Map<Integer, String> REPORT_USER_CATEGORIES_MAP =
      Map.of(
          0, "不適切な名前やプロフィール",
          1, "スパムやなりすまし",
          2, "犯罪行為の助長",
          3, "その他");
}
