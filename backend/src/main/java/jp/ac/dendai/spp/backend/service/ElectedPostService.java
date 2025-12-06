package jp.ac.dendai.spp.backend.service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.PostConstant;
import jp.ac.dendai.spp.backend.entity.ElectedPost;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.repository.ElectedPostRepository;
import jp.ac.dendai.spp.backend.repository.PostRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;

@Service
public class ElectedPostService {
  private final UserSettingRepository userSettingRepository;
  private final PostRepository postRepository;
  private final ElectedPostRepository electedPostsRepository;

  public ElectedPostService(
      UserSettingRepository userSettingsRepository,
      PostRepository postRepository,
      ElectedPostRepository electedPostsRepository) {
    this.userSettingRepository = userSettingsRepository;
    this.postRepository = postRepository;
    this.electedPostsRepository = electedPostsRepository;
  }

  /**
   * 配信投稿を割り当てる定期処理
   *
   * @return
   */
  public void allocateDeliverPostsEnduring() {
    ZonedDateTime deliverDateTime = getTodayDeliverDateTime();
    List<UUID> allPostIds =
        postRepository.findPostIdsByCreatedAtBetween(deliverDateTime.minusDays(1), deliverDateTime);
    List<UUID> allPostIdsByNotSensitive =
        postRepository.findPostIdsByCreatedAtBetweenAndNotSensitive(
            deliverDateTime.minusDays(1), deliverDateTime);
    List<UserSetting> allUsers = userSettingRepository.findAllUsers();
    List<ElectedPost> electedPosts = new ArrayList<>();

    for (UserSetting user : allUsers) {
      electedPosts.addAll(
          allocateDeliverPosts(user, allPostIds, allPostIdsByNotSensitive, deliverDateTime));
    }

    electedPostsRepository.saveAll(electedPosts);
  }

  /**
   * 配信投稿を割り当てる一時処理
   *
   * @return
   */
  public void allocateDeliverPostsTemporary(UserSetting user) {
    ZonedDateTime todayDeliverDateTime = getTodayDeliverDateTime();
    ZonedDateTime[] deliverDateTimes = {
      todayDeliverDateTime.minusDays(1), todayDeliverDateTime.minusDays(2)
    };
    List<ElectedPost> electedPosts = new ArrayList<>();

    for (ZonedDateTime deliverDateTime : deliverDateTimes) {
      List<UUID> allPostIds =
          postRepository.findPostIdsByCreatedAtBetween(
              deliverDateTime.minusDays(1), deliverDateTime);
      List<UUID> allPostIdsByNotSensitive =
          postRepository.findPostIdsByCreatedAtBetweenAndNotSensitive(
              deliverDateTime.minusDays(1), deliverDateTime);
      electedPosts.addAll(
          allocateDeliverPosts(user, allPostIds, allPostIdsByNotSensitive, deliverDateTime));
    }

    electedPostsRepository.saveAll(electedPosts);
  }

  /**
   * 指定ユーザーに対して配信投稿を割り当てる
   *
   * @param user
   * @param allPostIds
   * @param allPostIdsByNotSensitive
   * @param deliveryDateTime
   * @return
   */
  public List<ElectedPost> allocateDeliverPosts(
      UserSetting user,
      List<UUID> allPostIds,
      List<UUID> allPostIdsByNotSensitive,
      ZonedDateTime deliveryDateTime) {
    List<UUID> pickedPostIds = new ArrayList<>();

    if (user.isShowAdultContent()) {
      Collections.shuffle(allPostIds);
      pickedPostIds =
          allPostIds.subList(
              0, Math.min(PostConstant.MAX_DELIVER_POSTS_PER_USER, allPostIds.size()));
    } else {
      Collections.shuffle(allPostIdsByNotSensitive);
      pickedPostIds =
          allPostIdsByNotSensitive.subList(
              0,
              Math.min(PostConstant.MAX_DELIVER_POSTS_PER_USER, allPostIdsByNotSensitive.size()));
    }

    List<ElectedPost> electedPosts = new ArrayList<>();

    for (int i = 0; i < pickedPostIds.size(); i++) {
      electedPosts.add(
          new ElectedPost(user.getUserId(), pickedPostIds.get(i), i, deliveryDateTime));
    }

    return electedPosts;
  }

  /**
   * 配信対象日時を取得する
   *
   * @return
   */
  public ZonedDateTime getTodayDeliverDateTime() {
    // 現在の日時（タイムゾーン込み）
    ZonedDateTime now = ZonedDateTime.now();

    // 今日の午前6時を作成
    ZonedDateTime todayDeliverTime =
        now.toLocalDate().atTime(PostConstant.DATE_CHANGE_TIME).atZone(now.getZone());

    // もし現在時刻が 6:00 を過ぎていれば翌日の6:00を返す
    if (now.isAfter(todayDeliverTime)) {
      return todayDeliverTime.plusDays(1);
    } else {
      return todayDeliverTime;
    }
  }

  /**
   * ElectedPostを一括保存する
   *
   * @param electedPosts
   */
  public void saveAll(List<ElectedPost> electedPosts) {
    electedPostsRepository.saveAll(electedPosts);
  }
}
