package jp.ac.dendai.spp.backend.schedule;

import jp.ac.dendai.spp.backend.service.ElectedPostService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ManageSchedule {
  private final ElectedPostService electedPostService;

  public ManageSchedule(ElectedPostService electedPostService) {
    this.electedPostService = electedPostService;
  }

  @Scheduled(cron = "0 40 6 * * *")
  @Transactional
  public void runElectedPostsAllocation() {
    electedPostService.allocateDeliverPostsEnduring();
  }
}
