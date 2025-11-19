package jp.ac.dendai.spp.backend.service;

import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.entity.BaseToken;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.AuthRequest;
import jp.ac.dendai.spp.backend.repository.PasswordResetTokenRepository;
import jp.ac.dendai.spp.backend.repository.PreRegisterTokenRepository;
import jp.ac.dendai.spp.backend.util.TimeManage;

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
    BaseToken tokenEntity;

    if (request.getPathType().equals(TokenConstant.PRE_REGISTER)) {
      tokenEntity = preRegisterTokenRepository.findByToken(request.getToken());
    } else if (request.getPathType().equals(TokenConstant.PASSWORD_RESET)) {
      tokenEntity = passwordResetTokenRepository.findByToken(request.getToken());
    } else {
      throw new InvalidParameterException("Invalid path type");
    }

    if (tokenEntity == null) {
      throw new AuthenticationFailedException("Failed to authenticate token");
    }
    if (TimeManage.isExpired(tokenEntity)) {
      throw new AuthenticationFailedException("Failed to authenticate token");
    }
  }
}
