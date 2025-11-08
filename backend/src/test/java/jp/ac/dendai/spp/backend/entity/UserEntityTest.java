package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
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
public class UserEntityTest {

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

  @Test
  void testPersistAndRetrieveUser() {
    // 保存前にUUIDはnull
    User user = new User("test4@example.com", "password4");
    assertThat(user.getUserId()).isNull();

    // 永続化
    User savedUser = userRepository.save(user);

    // UUIDが自動生成されていることを確認
    assertThat(savedUser.getUserId()).isNotNull();

    // データベースから取得
    Optional<User> retrievedUserOpt = userRepository.findById(savedUser.getUserId());
    assertThat(retrievedUserOpt).isPresent();

    User retrievedUser = retrievedUserOpt.get();
    assertThat(retrievedUser.getEmailAddress()).isEqualTo("test4@example.com");
    assertThat(retrievedUser.getPassword()).isEqualTo("password4");
    assertThat(retrievedUser.getCreatedAt()).isNotNull();
    assertThat(retrievedUser.getUpdatedAt()).isNotNull();
  }
}
