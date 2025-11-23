package jp.ac.dendai.spp.backend.service;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.UUID;
import jp.ac.dendai.spp.backend.entity.AdminUser;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.LoginRequest;
import jp.ac.dendai.spp.backend.repository.AdminRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import jp.ac.dendai.spp.backend.util.JWTVerifyAction;
import jp.ac.dendai.spp.backend.util.JWTbuilder;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final String secret;
  private final UserRepository userRepository;
  private final AdminRepository adminRepository;
  private final UserSettingRepository userSettingRepository;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthService(
      UserRepository userRepository,
      AdminRepository adminRepository,
      UserSettingRepository userSettingRepository) {
    secret = System.getenv("JWT_SECRET");
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
    this.userSettingRepository = userSettingRepository;
  }

  /**
   * メールアドレスとパスワードでユーザー認証を行う
   *
   * @param request
   * @return
   */
  public User getUserByEmailAndPassword(LoginRequest request) {
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

    return user;
  }

  /**
   * パスワードをハッシュ化する
   *
   * @param rawPassword
   * @return
   */
  public String hashPassword(String rawPassword) {
    return encoder.encode(rawPassword);
  }

  /** */
  public ResponseCookie buildCookie(UUID id) {
    // JWTトークンの生成
    JWTbuilder jwtBuilder = new JWTbuilder();
    String token = jwtBuilder.build(id);

    ResponseCookie cookie =
        ResponseCookie.from("token", token)
            .httpOnly(true)
            .secure(true)
            .path("/")
            .maxAge(JWTbuilder.getExpirationTime())
            .sameSite("Strict")
            .build();
    return cookie;
  }

  /**
   * ユーザー認証を行い、JWTトークンを含むオブジェクトを返す
   *
   * @param request
   * @return
   */
  public ResponseCookie login(LoginRequest request) {
    User user = getUserByEmailAndPassword(request);

    return buildCookie(user.getUserId());
  }

  /**
   * ユーザー認証を行い、JWTトークンを含むオブジェクトを返す
   *
   * @param request
   * @return
   */
  public ResponseCookie adminLogin(LoginRequest request) {
    User user = getUserByEmailAndPassword(request);

    // AdminUserの存在確認
    AdminUser adminUser = adminRepository.findByUserId(user.getUserId());
    if (adminUser == null) {
      throw new AuthenticationFailedException(
          "Admin user not found for userId: " + user.getUserId());
    }

    return buildCookie(user.getUserId());
  }

  public String getDisplayIdByUserId(UUID userId) {
    UserSetting user = userSettingRepository.findByUserId(userId);

    if (user == null) {
      throw new AuthenticationFailedException("User not found for userId: " + userId);
    }

    return user.getDisplayId();
  }

  /**
   * ユーザー認証をuserIdで行う userIdに対応するUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param userId
   */
  public void authByUserId(UUID userId) {
    User user = userRepository.findByUserId(userId);

    if (user == null) {
      throw new AuthenticationFailedException("User not found for userId: " + userId);
    }
  }

  /**
   * Admin認証をuserIdで行う userIdに対応するAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param adminUserId
   */
  public void authAdminByUserId(UUID adminUserId) {
    AdminUser adminUser = adminRepository.findByUserId(adminUserId);

    if (adminUser == null) {
      throw new AuthenticationFailedException("Admin user not found for userId: " + adminUserId);
    }
  }

  /**
   * User認証をJWTトークンで行う トークンが不正またはUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param token
   * @return
   */
  public UUID auth(String token) {
    UUID userId = authByJwt(token);
    authByUserId(userId);

    return userId;
  }

  /**
   * Admin認証をJWTトークンで行う トークンが不正またはAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   *
   * @param token
   * @return
   */
  public UUID adminAuth(String token) {
    UUID userId = authByJwt(token);
    authAdminByUserId(userId);

    return userId;
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
      DecodedJWT jwt = verifier.verifyRead(jwtToken);

      // ユーザーIDを抽出
      String idStr = jwt.getSubject();

      return UUID.fromString(idStr);

    } catch (Exception e) {
      throw new AuthenticationFailedException("JWT verification failed", e);
    }
  }
}
