package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.CommonConstant;
import jp.ac.dendai.spp.backend.constant.ImageConstant;
import jp.ac.dendai.spp.backend.constant.PlatformConstant;
import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateUserRequest;
import jp.ac.dendai.spp.backend.form.request.UpdateUserRequest;
import jp.ac.dendai.spp.backend.repository.PreRegisterTokenRepository;
import jp.ac.dendai.spp.backend.repository.SocialAccountRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import jp.ac.dendai.spp.backend.util.ImageManager;
import jp.ac.dendai.spp.backend.util.SocialAccountManage;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
  private final AuthService authService;
  private final TokenService tokenService;
  private final UserRepository userRepository;
  private final UserSettingRepository userSettingRepository;
  private final SocialAccountRepository socialAccountRepository;
  private final DisplayIdService displayIdService;
  private final PreRegisterTokenRepository preRegisterTokenRepository;

  public UserService(
      AuthService authService,
      TokenService tokenService,
      UserRepository userRepository,
      UserSettingRepository userSettingRepository,
      SocialAccountRepository socialAccountRepository,
      DisplayIdService displayIdService,
      PreRegisterTokenRepository preRegisterTokenRepository) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
    this.userSettingRepository = userSettingRepository;
    this.socialAccountRepository = socialAccountRepository;
    this.displayIdService = displayIdService;
    this.preRegisterTokenRepository = preRegisterTokenRepository;
  }

  @Transactional
  public ResponseCookie register(CreateUserRequest request) {
    PreRegisterToken preRegisterToken =
        (PreRegisterToken) tokenService.verifyToken(request.getToken(), TokenConstant.PRE_REGISTER);

    if (displayIdService.isUsed(request.getUserId())) {
      throw new InvalidParameterException("Display ID is already in use");
    }

    if (request.getBirthday().isAfter(LocalDate.now())) {
      throw new InvalidParameterException("Birthday cannot be in the future");
    }

    boolean showAdultContents =
        !request.getBirthday().plusYears(CommonConstant.ADULT_AGE).isAfter(LocalDate.now())
            && request.getShowAdultContents();

    User user = createUser(preRegisterToken);

    UserSetting setting =
        new UserSetting(
            user.getUserId(),
            request.getName(),
            request.getUserId(),
            request.getBirthday(),
            showAdultContents);

    userSettingRepository.save(setting);

    createSocialAccounts(request.getSocialAccounts(), user.getUserId());

    preRegisterTokenRepository.delete(preRegisterToken);

    return authService.buildCookie(user.getUserId());
  }

  /**
   * ユーザーを作成する
   *
   * @param preRegisterToken
   * @return
   */
  public User createUser(PreRegisterToken preRegisterToken) {
    User user = new User(preRegisterToken.getEmailAddress(), preRegisterToken.getPassword());
    userRepository.save(user);
    return user;
  }

  /**
   * ソーシャルアカウント情報を保存する
   *
   * @param socialAccounts
   * @param userId
   */
  public void createSocialAccounts(List<SocialAccount> socialAccounts, UUID userId) {
    if (socialAccounts == null || socialAccounts.isEmpty()) return;

    List<SocialAccountEntity> accountsToSave = new ArrayList<SocialAccountEntity>();

    for (SocialAccount account : socialAccounts) {
      String link = SocialAccountManage.convertLink(account.getName(), account.getIdentifier());
      int platformId = PlatformConstant.PLATFORM_LIST.indexOf(account.getName());
      if (platformId == -1) {
        throw new InvalidParameterException("Invalid platform name: " + account.getName());
      }
      SocialAccountEntity entity = new SocialAccountEntity(userId, platformId, link);
      accountsToSave.add(entity);
    }
    socialAccountRepository.saveAll(accountsToSave);
  }

  @Transactional
  /**
   * Updates the user's settings and social accounts.
   *
   * <p>This method authenticates the user by JWT token, validates and updates user settings
   * such as birthday, name, display ID, introduction, icon, and header images. It also updates
   * the user's social accounts. If any validation fails, an {@link InvalidParameterException}
   * is thrown.
   *
   * @param token JWT token used for user authentication
   * @param request {@link UpdateUserRequest} containing the new user settings and social accounts
   * @throws InvalidParameterException if validation fails or user is not found
   */
  public void update(String token, UpdateUserRequest request) {
    UUID userId = authService.authByJwt(token);
    UserSetting userSetting = userSettingRepository.findByUserId(userId);
    if (userSetting == null) {
      throw new InvalidParameterException("User not found");
    }

    if (request.getBirthday() != null) {
      if (request.getBirthday().isAfter(LocalDate.now())) {
        throw new InvalidParameterException("Birthday cannot be in the future");
      }
      userSetting.setBirthday(request.getBirthday());
      boolean showAdultContents =
          !request.getBirthday().plusYears(CommonConstant.ADULT_AGE).isAfter(LocalDate.now())
              && request.getShowAdultContents();
      userSetting.setShowAdultContent(showAdultContents);
    }

    if (request.getName() != null) {
      userSetting.setName(request.getName());
    }

    if (request.getUserId() != null) {
      if (!request.getUserId().equals(userSetting.getDisplayId())
          && displayIdService.isUsed(request.getUserId())) {
        throw new InvalidParameterException("Display ID is already in use");
      }
      userSetting.setDisplayId(request.getUserId());
    }

    if (request.getIntroduction() != null) {
      userSetting.setIntroduction(request.getIntroduction());
    }

    if (request.getIcon() != null && !request.getIcon().isEmpty()) {
      String iconPath;
      try {
        iconPath = ImageManager.processAndSaveImage(request.getIcon(), ImageConstant.TYPE_ICON);
      } catch (Exception e) {
        throw new InvalidParameterException("Failed to process icon image");
      }
      userSetting.setIconPath(iconPath);
    }

    if (request.getHeader() != null && !request.getHeader().isEmpty()) {
      String headerPath;
      try {
        headerPath =
            ImageManager.processAndSaveImage(request.getHeader(), ImageConstant.TYPE_HEADER);
      } catch (Exception e) {
        throw new InvalidParameterException("Failed to process header image");
      }
      userSetting.setHeaderPath(headerPath);
    }

    socialAccountRepository.deleteByUserId(userId);
    createSocialAccounts(request.getSocialAccounts(), userId);

    System.out.println(userSetting);
    userSettingRepository.save(userSetting);
  }

  /**
   * メールアドレスからユーザー情報を取得する
   *
   * @param emailAddress
   * @return
   */
  public User findByEmailAddress(String emailAddress) {
    return userRepository.findByEmailAddress(emailAddress);
  }

  /**
   * ユーザーIDからユーザー情報を取得する
   *
   * @param userId
   * @return
   */
  public User findByUserId(UUID userId) {
    return userRepository.findByUserId(userId);
  }

  /**
   * パスワードを更新する
   *
   * @param userId
   * @param password
   */
  public void updatePassword(UUID userId, String password) {
    User user = userRepository.findByUserId(userId);

    user.setPassword(password);
    userRepository.save(user);
  }
}
