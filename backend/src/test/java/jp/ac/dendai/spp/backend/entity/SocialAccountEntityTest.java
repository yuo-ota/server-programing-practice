package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.SocialAccountRepository;
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
public class SocialAccountEntityTest {

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
  @Autowired private SocialAccountRepository socialAccountRepository;

  @Test
  void testPersistAndRetrieveSocialAccount() {
    // 保存前にUUIDはnull
    User user = new User("test4@example.com", "password4");
    User savedUser = userRepository.save(user);

    SocialAccountEntity socialAccount =
        new SocialAccountEntity(savedUser.getUserId(), 1, "https://example.com/profile");
    SocialAccountEntity savedSocialAccount = socialAccountRepository.save(socialAccount);

    // UUIDが自動生成されていることを確認
    assertThat(savedSocialAccount.getUserId()).isNotNull();

    // データベースから取得
    Optional<SocialAccountEntity> retrievedSocialAccountOpt =
        socialAccountRepository.findById(savedSocialAccount.getId());
    assertThat(retrievedSocialAccountOpt).isPresent();

    SocialAccountEntity retrievedSocialAccount = retrievedSocialAccountOpt.get();
    assertThat(retrievedSocialAccount.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedSocialAccount.getCreatedAt()).isNotNull();
  }
}
