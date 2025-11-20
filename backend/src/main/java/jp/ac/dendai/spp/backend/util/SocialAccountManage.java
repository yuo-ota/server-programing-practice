package jp.ac.dendai.spp.backend.util;

import jp.ac.dendai.spp.backend.constant.PlatformConstant;

public class SocialAccountManage {
  public static String convertLink(String name, String identifier) {
    switch (PlatformConstant.PLATFORM_LIST.indexOf(name)) {
      case 0:
        return "https://x.com/" + identifier;
      case 1:
        return "https://www.instagram.com/" + identifier;
      case 2:
        return identifier;
      case 3:
        return "https://skeb.jp/@" + identifier;
      case 4:
        return "https://bsky.app/profile/" + identifier;
      default:
        return identifier;
    }
  }
}
