package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
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
public class UserSettingEntityTest {

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
  @Autowired private UserSettingRepository userSettingRepository;

  @Test
  void testPersistAndRetrieveUserSetting() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    UserSetting userSetting =
        new UserSetting(
            savedUser.getUserId(), "Test User", "testuser", LocalDate.parse("2000-01-01"), false);
    UserSetting savedUserSetting = userSettingRepository.save(userSetting);

    // UUIDが自動生成されていることを確認
    assertThat(savedUserSetting.getUserId()).isNotNull();
    // データベースから取得
    Optional<UserSetting> retrievedUserSettingOpt =
        userSettingRepository.findById(savedUserSetting.getId());
    assertThat(retrievedUserSettingOpt).isPresent();

    UserSetting retrievedUserSetting = retrievedUserSettingOpt.get();
    assertThat(retrievedUserSetting.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedUserSetting.getCreatedAt()).isNotNull();
  }
}
