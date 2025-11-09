package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.AdminRepository;
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
public class AdminUserEntityTest {

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

  @Test
  void testPersistAndRetrieveUser() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    AdminUser adminUser = new AdminUser(savedUser.getUserId());
    AdminUser savedAdminUser = adminRepository.save(adminUser);

    // UUIDが自動生成されていることを確認
    assertThat(savedAdminUser.getUserId()).isNotNull();

    // データベースから取得
    Optional<AdminUser> retrievedAdminUserOpt = adminRepository.findById(savedAdminUser.getId());
    assertThat(retrievedAdminUserOpt).isPresent();

    AdminUser retrievedAdminUser = retrievedAdminUserOpt.get();
    assertThat(retrievedAdminUser.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedAdminUser.getCreatedAt()).isNotNull();
  }
}
