package jp.ac.dendai.spp.backend.constant;

import java.time.Duration;

public class TokenConstant {
  public static final String PRE_REGISTER = "PRE_REGISTER";
  public static final String PASSWORD_RESET = "PASSWORD_RESET";
  public static final Duration PRE_REGISTER_TOKEN_DURATION = Duration.ofMinutes(15);
  public static final Duration PASSWORD_RESET_TOKEN_DURATION = Duration.ofMinutes(5);
}
