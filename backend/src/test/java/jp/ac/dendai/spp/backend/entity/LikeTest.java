package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import jp.ac.dendai.spp.backend.repository.LikeRepository;
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
public class LikeTest {

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
  @Autowired private LikeRepository likeRepository;

  @Test
  void testPersistAndRetrieveLike() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    Post post = new Post(savedUser.getUserId(), "Test Post", false, true);
    Post savedPost = postRepository.save(post);

    Like like = new Like(savedUser.getUserId(), savedPost.getId());
    Like savedLike = likeRepository.save(like);

    // UUIDが自動生成されていることを確認
    assertThat(savedLike.getId()).isNotNull();
    // データベースから取得
    Optional<Like> retrievedLikeOpt = likeRepository.findById(savedLike.getId());
    assertThat(retrievedLikeOpt).isPresent();

    Like retrievedLike = retrievedLikeOpt.get();
    assertThat(retrievedLike.getUserId()).isEqualTo(savedUser.getUserId());
    assertThat(retrievedLike.getPostId()).isEqualTo(savedPost.getId());
    assertThat(retrievedLike.getCreatedAt()).isNotNull();
  }
}
