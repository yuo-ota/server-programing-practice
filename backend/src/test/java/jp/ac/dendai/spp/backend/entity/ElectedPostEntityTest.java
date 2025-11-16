package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.ZonedDateTime;
import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.ElectedPostRepository;
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
public class ElectedPostEntityTest {

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
  @Autowired private ElectedPostRepository electedPostRepository;

  @Test
  void testPersistAndRetrieveElectedPost() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    User deliveredUser = new User("test6@example.com", "password6");
    User savedDeliveredUser = userRepository.save(deliveredUser);

    Post deliveredPost = new Post(savedUser.getUserId(), "Test Post", false, true);
    Post savedDeliveredPost = postRepository.save(deliveredPost);

    ElectedPost electedPost =
        new ElectedPost(
            savedDeliveredUser.getUserId(),
            savedDeliveredPost.getId(),
            1,
            ZonedDateTime.parse("2025-01-01T10:00:00+09:00[Asia/Tokyo]"));
    ElectedPost savedElectedPost = electedPostRepository.save(electedPost);

    // UUIDが自動生成されていることを確認
    assertThat(savedElectedPost.getId()).isNotNull();
    // データベースから取得
    Optional<ElectedPost> retrievedElectedPostOpt =
        electedPostRepository.findById(savedElectedPost.getId());
    assertThat(retrievedElectedPostOpt).isPresent();

    ElectedPost retrievedElectedPost = retrievedElectedPostOpt.get();
    assertThat(retrievedElectedPost.getId()).isEqualTo(savedElectedPost.getId());
    assertThat(retrievedElectedPost.getUserId()).isEqualTo(savedElectedPost.getUserId());
    assertThat(retrievedElectedPost.getPostId()).isEqualTo(savedElectedPost.getPostId());
    assertThat(retrievedElectedPost.getIndex()).isEqualTo(savedElectedPost.getIndex());
    assertThat(retrievedElectedPost.getDeliveredAt()).isEqualTo(savedElectedPost.getDeliveredAt());
    assertThat(retrievedElectedPost.getCreatedAt()).isNotNull();
  }
}
