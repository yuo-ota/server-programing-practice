package jp.ac.dendai.spp.backend.service;

import java.security.SecureRandom;
import java.util.Base64;
import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.entity.BaseToken;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.AuthRequest;
import jp.ac.dendai.spp.backend.repository.PasswordResetTokenRepository;
import jp.ac.dendai.spp.backend.repository.PreRegisterTokenRepository;
import jp.ac.dendai.spp.backend.util.TimeManage;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
  public final AuthService authService;
  public final PreRegisterTokenRepository preRegisterTokenRepository;
  public final PasswordResetTokenRepository passwordResetTokenRepository;

  public TokenService(
      AuthService authService,
      PreRegisterTokenRepository preRegisterTokenRepository,
      PasswordResetTokenRepository passwordResetTokenRepository) {
    this.authService = authService;
    this.preRegisterTokenRepository = preRegisterTokenRepository;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
  }

  /**
   * Validate token availability SHA-256のtokenが有効かどうかを検証するメソッド 指定したpathTypeに応じて、tokenを検索し、有効期限を確認する
   *
   * @param request
   * @throws InvalidParameterException
   * @throws AuthenticationFailedException
   */
  public void isAvailable(AuthRequest request) {
    String token = request.getToken();
    String pathType = request.getPathType();

    verifyToken(token, pathType);
  }

  public BaseToken verifyToken(String token, String pathType) {
    BaseToken tokenEntity;

    if (pathType.equals(TokenConstant.PRE_REGISTER)) {
      tokenEntity = preRegisterTokenRepository.findByToken(token);
    } else if (pathType.equals(TokenConstant.PASSWORD_RESET)) {
      tokenEntity = passwordResetTokenRepository.findByToken(token);
    } else {
      throw new InvalidParameterException("Invalid path type");
    }

    if (tokenEntity == null) {
      throw new AuthenticationFailedException("Failed to authenticate token");
    }
    if (TimeManage.isExpired(tokenEntity)) {
      throw new AuthenticationFailedException("Failed to authenticate token");
    }

    return tokenEntity;
  }

  public String generateToken() {
    SecureRandom sr = new SecureRandom();
    byte[] bytes = new byte[TokenConstant.TOKEN_BYTE_LENGTH];
    sr.nextBytes(bytes);

    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }
}
