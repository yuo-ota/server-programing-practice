package jp.ac.dendai.spp.backend.entity;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import jp.ac.dendai.spp.backend.repository.ImageRepository;
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
public class ImageEntityTest {

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
  @Autowired private ImageRepository imageRepository;

  @Test
  void testPersistAndRetrieveImage() {
    // 保存前にUUIDはnull
    User user = new User("test5@example.com", "password5");
    User savedUser = userRepository.save(user);

    Post post = new Post(savedUser.getUserId(), "Test Post", false, true);
    Post savedPost = postRepository.save(post);

    ImageEntity image = new ImageEntity(savedPost.getId(), 0, "/images/test.jpg", "Test Image");
    ImageEntity savedImage = imageRepository.save(image);

    // UUIDが自動生成されていることを確認
    assertThat(savedImage.getId()).isNotNull();
    // データベースから取得
    Optional<ImageEntity> retrievedImageOpt = imageRepository.findById(savedImage.getId());
    assertThat(retrievedImageOpt).isPresent();

    ImageEntity retrievedImage = retrievedImageOpt.get();
    assertThat(retrievedImage.getPostId()).isEqualTo(savedPost.getId());
    assertThat(retrievedImage.getCreatedAt()).isNotNull();
  }
}
