package jp.ac.dendai.spp.backend.service;

import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;

import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.entity.PasswordResetToken;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.CreatePasswordResetEmailRequest;
import jp.ac.dendai.spp.backend.repository.PasswordResetTokenRepository;
import jp.ac.dendai.spp.backend.util.EmailManager;

@Service
public class PasswordResetService {
  private final UserService userService;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final EmailManager emailManager;

  public PasswordResetService(
      UserService userService,
      PasswordResetTokenRepository passwordResetTokenRepository,
      EmailManager emailManager) {
    this.userService = userService;
    this.passwordResetTokenRepository = passwordResetTokenRepository;
    this.emailManager = emailManager;
  }

  public void registerProcess(CreatePasswordResetEmailRequest request) {
    User user = userService.findByEmailAddress(request.getEmailAddress());
    if (user == null) {
      throw new AuthenticationFailedException("User not found");
    }

    String token = generateToken();
    passwordResetTokenRepository.save(
        new PasswordResetToken(
            user.getUserId(), token, TokenConstant.PASSWORD_RESET_TOKEN_DURATION));

    sendPasswordResetEmail(request.getEmailAddress(), token);
  }

  private void sendPasswordResetEmail(String emailAddress, String token) {
    String frontendUrl = System.getenv("FRONTEND_URL");
    String passwordResetMailBody =
        "以下のリンクからパスワードの再設定を行ってください。\n"
            + frontendUrl
            + "/password-reset?token="
            + token
            + "\n\n"
            + "※このメールに心当たりがない場合は、破棄してください。";

    emailManager.sendSimpleEmail(emailAddress, "パスワード再設定のご案内", passwordResetMailBody);
  }

  public String generateToken() {
    SecureRandom sr = new SecureRandom();
    byte[] bytes = new byte[TokenConstant.TOKEN_BYTE_LENGTH];
    sr.nextBytes(bytes);

    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
  }
}
