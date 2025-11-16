package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import jp.ac.dendai.spp.backend.repository.AdminRepository;
import jp.ac.dendai.spp.backend.repository.LikeNotificationRepository;
import jp.ac.dendai.spp.backend.repository.LikeRepository;
import jp.ac.dendai.spp.backend.repository.NotificationRepository;
import jp.ac.dendai.spp.backend.repository.PenaltyNotificationRepository;
import jp.ac.dendai.spp.backend.repository.PenaltyRepository;
import jp.ac.dendai.spp.backend.repository.PostRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.ActiveProfiles;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
public class NotificationEntityTest {

  @ServiceConnection
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

  @BeforeAll
  static void beforeAll() {
    postgres.start();
  }

  @AfterAll
  static void afterAll() {
    postgres.stop();
  }

  @Autowired private UserRepository userRepository;
  @Autowired private AdminRepository adminRepository;
  @Autowired private PostRepository postRepository;
  @Autowired private LikeRepository likeRepository;
  @Autowired private PenaltyRepository penaltyRepository;
  @Autowired private NotificationRepository notificationRepository;
  @Autowired private LikeNotificationRepository likeNotificationRepository;
  @Autowired private PenaltyNotificationRepository penaltyNotificationRepository;

  @Test
  void testPersistAndRetrieveLikeNotification() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    Notification notification = new Notification(0,savedUser.getUserId());
    Notification savedNotification = notificationRepository.save(notification);

    User likedUser = new User("test6@example.com", "password6");
    User savedLikeUser = userRepository.save(likedUser);

    Post likedPost = new Post(savedUser.getUserId(), "Test Post", false, true);
    Post savedPost = postRepository.save(likedPost);

    Like like = new Like(savedLikeUser.getUserId(), savedPost.getId());
    Like savedLike = likeRepository.save(like);

    LikeNotification likeNotification = new LikeNotification(savedNotification.getId(), savedLike.getId());
    LikeNotification savedLikeNotification = likeNotificationRepository.save(likeNotification);

    // UUIDが自動生成されていることを確認
    assertThat(notification.getId()).isNotNull();
    assertThat(likeNotification.getId()).isNotNull();
    // データベースから取得
    Optional<Notification> retrievedNotificationOpt = notificationRepository.findById(savedNotification.getId());
    assertThat(retrievedNotificationOpt).isPresent();
    Optional<LikeNotification> retrievedLikeNotificationOpt = likeNotificationRepository.findById(savedLikeNotification.getId());
    assertThat(retrievedLikeNotificationOpt).isPresent();

    Notification retrievedNotification = retrievedNotificationOpt.get();
    assertThat(retrievedNotification.getId()).isEqualTo(savedNotification.getId());
    assertThat(retrievedNotification.getCategoryStatusId()).isEqualTo(0);
    assertThat(retrievedNotification.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedNotification.getCreatedAt()).isNotNull();

    LikeNotification retrievedLikeNotification = retrievedLikeNotificationOpt.get();
    assertThat(retrievedLikeNotification.getId()).isEqualTo(savedLikeNotification.getId());
    assertThat(retrievedLikeNotification.getNotificationId()).isEqualTo(savedNotification.getId());
    assertThat(retrievedLikeNotification.getLikeId()).isEqualTo(savedLike.getId());
  }

  @Test
  void testPersistAndRetrievePenaltyNotification() {
    // 保存前にUUIDはnull
    User user = new User("test7@example.com", "password7");
    User savedUser = userRepository.save(user);

    Notification notification = new Notification(0,savedUser.getUserId());
    Notification savedNotification = notificationRepository.save(notification);

    User userForAdmin = new User("test8@example.com", "password8");
    User savedUserForAdmin = userRepository.save(userForAdmin);

    AdminUser adminUser = new AdminUser(savedUserForAdmin.getUserId());
    AdminUser savedAdminUser = adminRepository.save(adminUser);

    Penalty penalty = new Penalty(1, savedUser.getUserId(), savedAdminUser.getUserId(), 7, "days", "Violation of rules");
    Penalty savedPenalty = penaltyRepository.save(penalty);

    PenaltyNotification penaltyNotification = new PenaltyNotification(savedNotification.getId(), savedPenalty.getId());
    PenaltyNotification savedPenaltyNotification = penaltyNotificationRepository.save(penaltyNotification);

    // UUIDが自動生成されていることを確認
    assertThat(notification.getId()).isNotNull();
    assertThat(penaltyNotification.getId()).isNotNull();
    // データベースから取得
    Optional<Notification> retrievedNotificationOpt = notificationRepository.findById(savedNotification.getId());
    assertThat(retrievedNotificationOpt).isPresent();
    Optional<PenaltyNotification> retrievedPenaltyNotificationOpt = penaltyNotificationRepository.findById(savedPenaltyNotification.getId());
    assertThat(retrievedPenaltyNotificationOpt).isPresent();

    Notification retrievedNotification = retrievedNotificationOpt.get();
    assertThat(retrievedNotification.getId()).isEqualTo(savedNotification.getId());
    assertThat(retrievedNotification.getCategoryStatusId()).isEqualTo(0);
    assertThat(retrievedNotification.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedNotification.getCreatedAt()).isNotNull();

    PenaltyNotification retrievedPenaltyNotification = retrievedPenaltyNotificationOpt.get();
    assertThat(retrievedPenaltyNotification.getId()).isEqualTo(savedPenaltyNotification.getId());
    assertThat(retrievedPenaltyNotification.getNotificationId()).isEqualTo(savedNotification.getId());
    assertThat(retrievedPenaltyNotification.getPenaltyId()).isEqualTo(savedPenalty.getId());
  }
}
  