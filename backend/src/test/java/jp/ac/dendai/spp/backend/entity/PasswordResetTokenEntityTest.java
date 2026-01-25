package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;
import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.PasswordResetTokenRepository;
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
public class PasswordResetTokenEntityTest {

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
  @Autowired private PasswordResetTokenRepository passwordResetTokenRepository;

  @Test
  void testPersistAndRetrievePasswordResetToken() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    PasswordResetToken passwordResetToken =
        new PasswordResetToken(
            savedUser.getUserId(),
            "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
            Duration.ofMinutes(5));
    assertThat(passwordResetToken.getId()).isNull();
    // 永続化
    PasswordResetToken savedPasswordResetToken =
        passwordResetTokenRepository.save(passwordResetToken);

    // UUIDが自動生成されていることを確認
    assertThat(savedPasswordResetToken.getId()).isNotNull();

    // データベースから取得
    Optional<PasswordResetToken> retrievedPasswordResetTokenOpt =
        passwordResetTokenRepository.findById(savedPasswordResetToken.getId());
    assertThat(retrievedPasswordResetTokenOpt).isPresent();
    PasswordResetToken retrievedPasswordResetToken = retrievedPasswordResetTokenOpt.get();
    assertThat(retrievedPasswordResetToken.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedPasswordResetToken.getToken())
        .isEqualTo("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");
    assertThat(retrievedPasswordResetToken.getCreatedAt()).isNotNull();
    assertThat(retrievedPasswordResetToken.getDuration()).isEqualTo(Duration.ofMinutes(5));
  }
}
