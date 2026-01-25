package jp.ac.dendai.spp.backend.constant;

import java.time.Duration;

public class TokenConstant {
  public static final String PRE_REGISTER = "PRE_REGISTER";
  public static final String PASSWORD_RESET = "PASSWORD_RESET";
  public static final Duration PRE_REGISTER_TOKEN_DURATION = Duration.ofMinutes(15);
  public static final Duration PASSWORD_RESET_TOKEN_DURATION = Duration.ofMinutes(5);
  public static final int TOKEN_BYTE_LENGTH = 48;
  public static final String PASSWORD_RESET_MAIL_SUBJECT = "パスワード再設定のご案内";
  public static final String PRE_REGISTER_MAIL_SUBJECT = "メールアドレス確認のご案内";
}
