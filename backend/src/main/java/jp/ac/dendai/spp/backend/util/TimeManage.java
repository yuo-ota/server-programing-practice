package jp.ac.dendai.spp.backend.util;

import java.time.ZonedDateTime;
import jp.ac.dendai.spp.backend.entity.BaseToken;

/**
 * Utility class for managing time-related operations tokenの有効期限を確認するためのメソッドを提供する
 *
 * @param token BaseTokenオブジェクト
 * @return boolean トークンが有効期限切れかどうか
 */
public class TimeManage {
  public static boolean isExpired(BaseToken token) {
    ZonedDateTime now = ZonedDateTime.now();
    return now.isAfter(token.getCreatedAt().plus(token.getDuration()));
  }
}
