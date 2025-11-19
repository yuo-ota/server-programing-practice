package jp.ac.dendai.spp.backend.service;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.AdminUser;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.AdminAuthRequest;
import jp.ac.dendai.spp.backend.form.request.LoginRequest;
import jp.ac.dendai.spp.backend.form.response.LoginResponse;
import jp.ac.dendai.spp.backend.repository.AdminRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.util.JWTVerifyAction;
import jp.ac.dendai.spp.backend.util.JWTbuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final String secret;
  private final UserRepository userRepository;
  private final AdminRepository adminRepository;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthService(
      @Value("${jwt.secret}") String secret,
      UserRepository userRepository,
      AdminRepository adminRepository) {
    this.secret = secret;
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
  }

  /**
   * ユーザー認証を行い、JWTトークンを含むオブジェクトを返す
   *
   * @param request
   * @return
   */
  public LoginResponse login(LoginRequest request) {
    User user = userRepository.findByEmailAddress(request.getEmailAddress());
    if (user == null) {
      throw new AuthenticationFailedException(
          "User not found for email: " + request.getEmailAddress());
    }

    // パスワードの検証
    boolean passwordMatches = encoder.matches(request.getPassword(), user.getPassword());
    if (!passwordMatches) {
      throw new AuthenticationFailedException(
          "Invalid password for email: " + request.getEmailAddress());
    }

    // JWTトークンの生成
    JWTbuilder jwtBuilder = new JWTbuilder(secret);
    String token = jwtBuilder.build(user.getUserId());
    return new LoginResponse(token);
  }

  /**
   * Admin認証をuserIdで行う userIdに対応するAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param userId
   */
  public void authAdminByUserId(UUID userId) {
    AdminUser adminUser = adminRepository.findByUserId(userId);

    if (adminUser == null) {
      throw new AuthenticationFailedException("Admin user not found for userId: " + userId);
    }
  }

  /**
   * Admin認証をJWTトークンで行う トークンが不正またはAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param token
   */
  public void adminAuth(String token) {
    System.out.println("AdminAuthRequest token: " + token);
    UUID userId = authByJwt(token);
    authAdminByUserId(userId);
  }

  /**
   * JWTトークンを検証し、userIdを取得する
   *
   * @param jwtToken
   * @return
   */
  public UUID authByJwt(String jwtToken) {
    Algorithm algorithm = Algorithm.HMAC256(secret);
    JWTVerifyAction verifier = JWTVerifyAction.of(algorithm);

    try {
      // 署名・有効期限を検証
      System.out.println("jwtToken: " + jwtToken);
      DecodedJWT jwt = verifier.verifyRead(jwtToken);

      // ユーザーIDを抽出
      String idStr = jwt.getSubject();
      System.out.println("Decoded userId: " + idStr);

      return UUID.fromString(idStr);

    } catch (Exception e) {
      throw new AuthenticationFailedException("JWT verification failed", e);
    }
  }
}
