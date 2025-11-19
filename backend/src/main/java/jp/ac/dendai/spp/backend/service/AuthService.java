package jp.ac.dendai.spp.backend.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import jp.ac.dendai.spp.backend.entity.AdminUser;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.AdminAuthRequest;
import jp.ac.dendai.spp.backend.form.request.LoginRequest;
import jp.ac.dendai.spp.backend.form.response.LoginResponse;
import jp.ac.dendai.spp.backend.repository.AdminRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.util.JWTVerifyAction;

public class AuthService {
  private final String secret;
  private final UserRepository userRepository;
  private final AdminRepository adminRepository;

  public AuthService(@Value("${jwt.secret}") String secret, UserRepository userRepository, AdminRepository adminRepository) {
    this.secret = secret;
    this.userRepository = userRepository;
    this.adminRepository = adminRepository;
  }


  // public LoginResponse login(LoginRequest request) {
  //   User user = userRepository.findByEmailAddress(request.getEmailAddress());

  //   if (user == null) {
  //     throw new AuthenticationFailedException("User not found for email: " + request.getEmailAddress());
  //   }

    
  // }

  /**
   * Admin認証をuserIdで行う
   * userIdに対応するAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   * @param userId
   */
  public void authAdminByUserId(UUID userId) {
    AdminUser adminUser = adminRepository.findByUserId(userId);

    if (adminUser == null) {
      throw new AuthenticationFailedException("Admin user not found for userId: " + userId);
    }
  }

  /**
   * Admin認証をJWTトークンで行う
   * トークンが不正またはAdminUserが存在しなければAuthenticationFailedExceptionを投げる
   * @param request
   */
  public void adminAuth(AdminAuthRequest request) {
    UUID userId = authByJwt(request.getToken());
    authAdminByUserId(userId);
  }

  /**
   * JWTトークンを検証し、userIdを取得する
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
