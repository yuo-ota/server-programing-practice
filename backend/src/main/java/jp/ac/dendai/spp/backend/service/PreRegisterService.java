package jp.ac.dendai.spp.backend.service;

import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.RegisterRequest;
import jp.ac.dendai.spp.backend.repository.PreRegisterTokenRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.util.EmailManager;
import org.springframework.stereotype.Service;

@Service
public class PreRegisterService {
  private final TokenService tokenService;
  private final AuthService authService;
  private final UserRepository userRepository;
  private final PreRegisterTokenRepository preRegisterTokenRepository;
  private final EmailManager emailManager;

  public PreRegisterService(
      TokenService tokenService,
      AuthService authService,
      UserRepository userRepository,
      PreRegisterTokenRepository preRegisterTokenRepository,
      EmailManager emailManager) {
    this.tokenService = tokenService;
    this.authService = authService;
    this.userRepository = userRepository;
    this.preRegisterTokenRepository = preRegisterTokenRepository;
    this.emailManager = emailManager;
  }

  /**
   * パスワードリセットプロセスを登録する
   *
   * @param request
   */
  public void registerProcess(RegisterRequest request) {
    if (request.getEmailAddress() == null || request.getPassword() == null) {
      throw new InvalidParameterException("Email address and password must not be null.");
    }

    User existingUser = userRepository.findByEmailAddress(request.getEmailAddress());
    if (existingUser != null) {
      return;
    }

    String token = tokenService.generateToken();
    String hashedPassword = authService.hashPassword(request.getPassword());
    preRegisterTokenRepository.save(
        new PreRegisterToken(
            request.getEmailAddress(),
            hashedPassword,
            token,
            TokenConstant.PASSWORD_RESET_TOKEN_DURATION));

    sendPreRegisterEmail(request.getEmailAddress(), token);
  }

  /**
   * パスワードリセットメールを送信する
   *
   * @param emailAddress
   * @param token
   */
  private void sendPreRegisterEmail(String emailAddress, String token) {
    String frontendUrl = System.getenv("FRONTEND_URL");
    String preRegisterMailBody =
        "以下のリンクからパスワードの再設定を行ってください。\n"
            + frontendUrl
            + "/signup/verify?token="
            + token
            + "\n\n"
            + "※このメールに心当たりがない場合は、破棄してください。";

    emailManager.sendSimpleEmail(
        emailAddress, TokenConstant.PRE_REGISTER_MAIL_SUBJECT, preRegisterMailBody);
  }
}
