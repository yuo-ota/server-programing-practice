package jp.ac.dendai.spp.backend.constant;

import java.time.LocalTime;

public class PostConstant {
  public static final int DAYS_VIEWABLE_TRACEBACK = 1;
  public static final LocalTime DATE_CHANGE_TIME = LocalTime.of(6, 0);

  public static final int MAX_DELIVER_POSTS_PER_USER = 20;

  public static final int REGISTER_POSTS_BATCH_SIZE = 500;
}
