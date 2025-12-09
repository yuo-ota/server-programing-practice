package jp.ac.dendai.spp.backend.service;

import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.entity.PasswordResetToken;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.CreatePasswordResetEmailRequest;
import jp.ac.dendai.spp.backend.form.request.PasswordResetRequest;
import jp.ac.dendai.spp.backend.repository.PasswordResetTokenRepository;
import jp.ac.dendai.spp.backend.util.EmailManager;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {
  private final UserService userService;
  private final AuthService authService;
  private final TokenService tokenService;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final EmailManager emailManager;

  public PasswordResetService(
      TokenService tokenService,
      UserService userService,
      AuthService authService,
      PasswordResetTokenRepository passwordResetTokenRepository,
      EmailManager emailManager) {

    this.tokenService = tokenService;
    this.userService = userService;
    this.authService = authService;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
    this.emailManager = emailManager;
  }

  /**
   * パスワードリセットプロセスを登録する
   *
   * @param request
   */
  public void registerProcess(CreatePasswordResetEmailRequest request) {
    User user = userService.findByEmailAddress(request.getEmailAddress());
    if (user == null) {
      throw new AuthenticationFailedException("User not found");
    }

    String token = tokenService.generateToken();
    passwordResetTokenRepository.save(
        new PasswordResetToken(
            user.getUserId(), token, TokenConstant.PASSWORD_RESET_TOKEN_DURATION));

    sendPasswordResetEmail(request.getEmailAddress(), token);
  }

  /**
   * パスワードリセットメールを送信する
   *
   * @param emailAddress
   * @param token
   */
  private void sendPasswordResetEmail(String emailAddress, String token) {
    String frontendUrl = System.getenv("FRONTEND_URL");
    String passwordResetMailBody =
        "以下のリンクからパスワードの再設定を行ってください。\n"
            + frontendUrl
            + "/password-reset/verify?token="
            + token
            + "\n\n"
            + "※このメールに心当たりがない場合は、破棄してください。";

    emailManager.sendSimpleEmail(
        emailAddress, TokenConstant.PASSWORD_RESET_MAIL_SUBJECT, passwordResetMailBody);
  }

  /**
   * パスワードリセットを行う
   *
   * @param request
   */
  public void resetPassword(PasswordResetRequest request) {
    PasswordResetToken resetToken =
        (PasswordResetToken)
            tokenService.verifyToken(request.getToken(), TokenConstant.PASSWORD_RESET);
    String hashedPassword = authService.hashPassword(request.getPassword());

    userService.updatePassword(resetToken.getUserId(), hashedPassword);

    passwordResetTokenRepository.delete(resetToken);
  }
}
