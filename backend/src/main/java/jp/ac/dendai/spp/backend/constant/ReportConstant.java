package jp.ac.dendai.spp.backend.constant;

import java.util.List;

public class ReportConstant {
  public static final List<String> REPORT_POST_CATEGORIES_LIST =
      List.of("不適切な公開制限", "ヘイト", "攻撃的な行為や嫌がらせ", "暴力的な発言", "プライバシーの侵害", "スパムやなりすまし", "その他");

  public static final List<String> REPORT_USER_CATEGORIES_LIST =
      List.of("不適切な名前やプロフィール", "スパムやなりすまし", "犯罪行為の助長", "その他");
}
