package jp.ac.dendai.spp.backend.schedule;

import jp.ac.dendai.spp.backend.constant.DiscordConstant;
import jp.ac.dendai.spp.backend.service.ElectedPostService;
import jp.ac.dendai.spp.backend.util.DiscordWebhookSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ManageSchedule {
  private final ElectedPostService electedPostService;

  public ManageSchedule(ElectedPostService electedPostService) {
    this.electedPostService = electedPostService;
  }

  @Scheduled(cron = "0 50 2 * * *", zone = "${TIMEZONE}")
  @Transactional
  public void runElectedPostsAllocation() {
    try {
      electedPostService.allocateDeliverPostsEnduring();
    } catch (Throwable t) {
      DiscordWebhookSender.notify(
          new String[] {DiscordConstant.BACKEND_ROLE_ID},
          "画像割り振り作業でエラーが発生しました。",
          DiscordWebhookSender.expandException(t));
      throw t;
    }
  }
}
