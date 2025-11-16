package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.AdminRepository;
import jp.ac.dendai.spp.backend.repository.PenaltyRepository;
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
public class PenaltyEntityTest {

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
  @Autowired private PenaltyRepository penaltyRepository;

  @Test
  void testPersistAndRetrievePenalty() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    AdminUser adminUser = new AdminUser(savedUser.getUserId());
    AdminUser savedAdminUser = adminRepository.save(adminUser);

    Penalty penalty =
        new Penalty(
            1, savedUser.getUserId(), savedAdminUser.getUserId(), 7, "days", "Violation of rules");
    Penalty savedPenalty = penaltyRepository.save(penalty);

    // UUIDが自動生成されていることを確認
    assertThat(savedPenalty.getId()).isNotNull();

    // データベースから取得
    Optional<Penalty> retrievedPenaltyOpt = penaltyRepository.findById(savedPenalty.getId());
    assertThat(retrievedPenaltyOpt).isPresent();

    Penalty retrievedPenalty = retrievedPenaltyOpt.get();
    assertThat(retrievedPenalty.getPenaltyStatusId()).isEqualTo(1);
    assertThat(retrievedPenalty.getPenalizedUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedPenalty.getAdminUserId()).isEqualTo(savedAdminUser.getUserId());
    assertThat(retrievedPenalty.getDurationValue()).isEqualTo(7);
    assertThat(retrievedPenalty.getDurationUnit()).isEqualTo("days");
    assertThat(retrievedPenalty.getReason()).isEqualTo("Violation of rules");
    assertThat(retrievedPenalty.getCreatedAt()).isNotNull();
  }
}
