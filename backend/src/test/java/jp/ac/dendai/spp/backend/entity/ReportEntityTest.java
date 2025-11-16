package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.PostRepository;
import jp.ac.dendai.spp.backend.repository.ReportRepository;
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
public class ReportEntityTest {

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
  @Autowired private PostRepository postRepository;
  @Autowired private ReportRepository reportRepository;

  @Test
  void testPersistAndRetrieveReportForUser() {
    // 保存前にUUIDはnull
    User reporter = new User("test5@example.com", "password5");
    User savedReporter = userRepository.save(reporter);

    User reportee = new User("test6@example.com", "password6");
    User savedReportee = userRepository.save(reportee);

    Report report = new Report(savedReporter.getUserId(), true, savedReportee.getUserId(), null, 1, "Inappropriate content");
    Report savedReport = reportRepository.save(report);

    // UUIDが自動生成されていることを確認
    assertThat(savedReport.getId()).isNotNull();
    // データベースから取得
    Optional<Report> retrievedReportOpt = reportRepository.findById(savedReport.getId());
    assertThat(retrievedReportOpt).isPresent();

    Report retrievedReport = retrievedReportOpt.get();
    assertThat(retrievedReport.getReporter()).isEqualTo(savedReporter.getUserId());
    assertThat(retrievedReport.getCreatedAt()).isNotNull();
  }

  @Test
  void testPersistAndRetrieveReportForPost() {
    // 保存前にUUIDはnull
    User reporter = new User("test7@example.com", "password7");
    User savedReporter = userRepository.save(reporter);

    Post post = new Post(savedReporter.getUserId(), "Test Post", false, true);
    Post savedPost = postRepository.save(post);

    Report report = new Report(savedReporter.getUserId(), true, null, savedPost.getId(), 1, "Inappropriate content");
    Report savedReport = reportRepository.save(report);

    // UUIDが自動生成されていることを確認
    assertThat(savedReport.getId()).isNotNull();
    // データベースから取得
    Optional<Report> retrievedReportOpt = reportRepository.findById(savedReport.getId());
    assertThat(retrievedReportOpt).isPresent();

    Report retrievedReport = retrievedReportOpt.get();
    assertThat(retrievedReport.getReporter()).isEqualTo(savedReporter.getUserId());
    assertThat(retrievedReport.getCreatedAt()).isNotNull();
  }
}
