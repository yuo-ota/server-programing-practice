package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.CommonConstant;
import jp.ac.dendai.spp.backend.constant.PlatformConstant;
import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateUserRequest;
import jp.ac.dendai.spp.backend.repository.SocialAccountRepository;
import jp.ac.dendai.spp.backend.repository.UserRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
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

  public UserService(
      AuthService authService,
      TokenService tokenService,
      UserRepository userRepository,
      UserSettingRepository userSettingRepository,
      SocialAccountRepository socialAccountRepository,
      DisplayIdService displayIdService) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
    this.userSettingRepository = userSettingRepository;
    this.socialAccountRepository = socialAccountRepository;
    this.displayIdService = displayIdService;
  }

  @Transactional
  public ResponseCookie register(CreateUserRequest request) {
    PreRegisterToken preRegisterToken =
        (PreRegisterToken) tokenService.verifyToken(request.getToken(), TokenConstant.PRE_REGISTER);

    if (displayIdService.isUsed(request.getUserId())) {
      throw new InvalidParameterException("Display ID is already in use");
    }

    boolean showAdultContents =
        request.getBirthday().plusYears(CommonConstant.ADULT_AGE).isBefore(LocalDate.now())
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
    return authService.buildCookie(user.getUserId());
  }

  public User createUser(PreRegisterToken preRegisterToken) {
    User user = new User(preRegisterToken.getEmailAddress(), preRegisterToken.getPassword());
    userRepository.save(user);
    return user;
  }

  public void createSocialAccounts(List<SocialAccount> socialAccounts, UUID userId) {
    if (socialAccounts == null || socialAccounts.isEmpty()) return;

    List<SocialAccountEntity> accountsToSave = new ArrayList<SocialAccountEntity>();

    for (SocialAccount account : socialAccounts) {
      String link = SocialAccountManage.convertLink(account.getName(), account.getIdentifier());
      SocialAccountEntity entity =
          new SocialAccountEntity(
              userId, PlatformConstant.PLATFORM_LIST.indexOf(account.getName()), link);
      accountsToSave.add(entity);
    }
    socialAccountRepository.saveAll(accountsToSave);
  }
}
