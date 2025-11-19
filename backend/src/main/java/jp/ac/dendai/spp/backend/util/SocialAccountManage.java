package jp.ac.dendai.spp.backend.util;

import jp.ac.dendai.spp.backend.constant.PlatformConstant;

public class SocialAccountManage {
  public static String convertLink(String name, String identifer) {
    switch (PlatformConstant.PLATFORM_LIST.indexOf(name)) {
      case 0:
        return "https://x.com/" + identifer;
      case 1:
        return "https://www.instagram.com/" + identifer;
      case 2:
        return identifer;
      case 3:
        return "https://skeb.jp/@" + identifer;
      case 4:
        return "https://bsky.app/profile/" + identifer;
      default:
        return identifer;
    }
  }
}
