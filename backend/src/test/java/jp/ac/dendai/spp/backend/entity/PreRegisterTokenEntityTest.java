package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;
import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.PreRegisterTokenRepository;
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
public class PreRegisterTokenEntityTest {

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

  @Autowired private PreRegisterTokenRepository preRegisterTokenRepository;

  @Test
  void testPersistAndRetrievePreRegisterToken() {
    // 保存前にUUIDはnull
    PreRegisterToken preRegisterToken =
        new PreRegisterToken(
            "test4@example.com",
            "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
            Duration.ofMinutes(5));
    assertThat(preRegisterToken.getId()).isNull();

    // 永続化
    PreRegisterToken savedPreRegisterToken = preRegisterTokenRepository.save(preRegisterToken);

    // UUIDが自動生成されていることを確認
    assertThat(savedPreRegisterToken.getId()).isNotNull();

    // データベースから取得
    Optional<PreRegisterToken> retrievedPreRegisterTokenOpt =
        preRegisterTokenRepository.findById(savedPreRegisterToken.getId());
    assertThat(retrievedPreRegisterTokenOpt).isPresent();
    PreRegisterToken retrievedPreRegisterToken = retrievedPreRegisterTokenOpt.get();
    assertThat(retrievedPreRegisterToken.getEmailAddress()).isEqualTo("test4@example.com");
    assertThat(retrievedPreRegisterToken.getToken())
        .isEqualTo("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb");
    assertThat(retrievedPreRegisterToken.getCreatedAt()).isNotNull();
    assertThat(retrievedPreRegisterToken.getDuration()).isEqualTo(Duration.ofMinutes(5));
  }
}
