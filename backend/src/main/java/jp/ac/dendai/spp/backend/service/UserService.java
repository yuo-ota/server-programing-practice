package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.CommonConstant;
import jp.ac.dendai.spp.backend.constant.ImageConstant;
import jp.ac.dendai.spp.backend.constant.PlatformConstant;
import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.dto.Content;
import jp.ac.dendai.spp.backend.dto.LikedPost;
import jp.ac.dendai.spp.backend.dto.OwnPost;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import jp.ac.dendai.spp.backend.entity.LikedPostEntity;
import jp.ac.dendai.spp.backend.entity.OwnPostEntity;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateUserRequest;
import jp.ac.dendai.spp.backend.form.request.ShowUserRequest;
import jp.ac.dendai.spp.backend.form.request.UpdateUserRequest;
import jp.ac.dendai.spp.backend.form.response.UserDataResponse;
import jp.ac.dendai.spp.backend.form.response.UserSettingResponse;
import jp.ac.dendai.spp.backend.repository.PostRepository;
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

  private final PostRepository postRepository;
  private final AuthService authService;
  private final TokenService tokenService;
  private final UserRepository userRepository;
  private final UserSettingRepository userSettingRepository;
  private final SocialAccountRepository socialAccountRepository;
  private final DisplayIdService displayIdService;
  private final ElectedPostService electedPostService;
  private final PreRegisterTokenRepository preRegisterTokenRepository;

  public UserService(
      AuthService authService,
      TokenService tokenService,
      UserRepository userRepository,
      UserSettingRepository userSettingRepository,
      SocialAccountRepository socialAccountRepository,
      DisplayIdService displayIdService,
      PreRegisterTokenRepository preRegisterTokenRepository,
      PostRepository postRepository,
      ElectedPostService electedPostService) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
    this.userSettingRepository = userSettingRepository;
    this.socialAccountRepository = socialAccountRepository;
    this.displayIdService = displayIdService;
    this.electedPostService = electedPostService;
    this.preRegisterTokenRepository = preRegisterTokenRepository;
    this.postRepository = postRepository;
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
        isShowAdultContents(request.getBirthday(), request.getShowAdultContents());

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

    electedPostService.allocateDeliverPostsTemporary(setting);

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

  /**
   *    * Updates the user's settings and social accounts.    *    *
   *
   * <p>   * This method authenticates the user by JWT token, validates and updates user    *
   * settings such as    * birthday, name, display ID, introduction, icon, and header images. It
   * also    * updates the user's    * social accounts. If any validation fails, an    * {@link
   * InvalidParameterException} is thrown.    *    * @param token   JWT token used for user
   * authentication    * @param request {@link UpdateUserRequest} containing the new user settings
   * and    *                social accounts    * @throws InvalidParameterException if validation
   * fails or user is not found
   */
  @Transactional
  public void update(String token, UpdateUserRequest request) {
    UUID userId = authService.auth(token);
    UserSetting userSetting = userSettingRepository.findByUserId(userId);
    if (userSetting == null) {
      throw new InvalidParameterException("User not found");
    }

    if (request.getBirthday() != null) {
      if (request.getBirthday().isAfter(LocalDate.now())) {
        throw new InvalidParameterException("Birthday cannot be in the future");
      }
      userSetting.setBirthday(request.getBirthday());
    }

    boolean showAdultContents =
        isShowAdultContents(userSetting.getBirthday(), request.getShowAdultContents());
    userSetting.setShowAdultContent(showAdultContents);

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
        throw new InvalidParameterException("Failed to process icon image", e);
      }
      userSetting.setIconPath(iconPath);
    }

    if (request.getHeader() != null && !request.getHeader().isEmpty()) {
      String headerPath;
      try {
        headerPath =
            ImageManager.processAndSaveImage(request.getHeader(), ImageConstant.TYPE_HEADER);
      } catch (Exception e) {
        throw new InvalidParameterException("Failed to process header image", e);
      }
      userSetting.setHeaderPath(headerPath);
    }

    socialAccountRepository.deleteByUserId(userId);
    createSocialAccounts(request.getSocialAccounts(), userId);

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

  /**
   * 成人向けコンテンツ表示設定を決定する
   *
   * @param birthday
   * @param showAdultContents
   * @return
   */
  public boolean isShowAdultContents(LocalDate birthday, boolean showAdultContents) {
    return !birthday.plusYears(CommonConstant.ADULT_AGE).isAfter(LocalDate.now())
        && showAdultContents;
  }

  /**
   * 認証済みユーザーIDを指定してユーザー情報を削除する。
   *
   * @param userId 削除対象のユーザーID（認証済みユーザーのID）
   * @throws InvalidParameterException 対象ユーザーが存在しない場合に送出
   */
  @Transactional
  public void delete(UUID userId) {
    User user = userRepository.findByUserId(userId);
    if (user == null) {
      throw new InvalidParameterException("User data not found for authenticated ID.");
    }
    userRepository.deleteById(userId);
  }

  /**
   * 指定された表示IDのユーザープロフィールと投稿一覧を取得し、閲覧者情報（userId）が一致する場合は「いいね」済み投稿も含めて返す。
   *
   * @param userId 閲覧者のユーザーID（自身の場合は likedPosts も返す。null なら閲覧者なし）
   * @param request 表示対象ユーザーを特定するリクエスト（displayId を含む）
   * @return 表示対象ユーザーのプロフィール・投稿・（必要に応じて）いいね済み投稿をまとめたレスポンス
   * @throws InvalidParameterException 表示対象ユーザーが存在しない場合に送出
   */
  public UserDataResponse show(UUID userId, ShowUserRequest request) {
    String displayId = request.getUserId();
    UserSetting targetUserSetting = userSettingRepository.findByDisplayId(displayId);
    if (targetUserSetting == null) {
      throw new InvalidParameterException("Target user not found with ID: " + displayId);
    }
    UUID targetUserId = targetUserSetting.getUserId();

    UserDataResponse response = new UserDataResponse();
    response.setName(targetUserSetting.getName());
    response.setIconPath(targetUserSetting.getIconPath());
    response.setHeaderPath(targetUserSetting.getHeaderPath());

    List<SocialAccount> socialAccounts = getSocialAccounts(targetUserId);
    response.setSocialAccounts(socialAccounts);

    List<OwnPost> ownPosts = getOwnPosts(targetUserId, targetUserSetting.getIconPath());
    response.setPosts(ownPosts);

    if (userId != null && userId.equals(targetUserId)) {
      List<LikedPost> likedPosts = getLikedPosts(targetUserId);
      response.setLikedPosts(likedPosts);
    }

    return response;
  }

  /**
   * 指定されたユーザーIDの投稿一覧を取得する。
   *
   * @param userId 投稿所有者のユーザーID
   * @param iconPath 投稿所有者のアイコンパス
   * @return 指定ユーザーの投稿一覧
   */
  public List<OwnPost> getOwnPosts(UUID userId, String iconPath) {
    List<OwnPost> ownPosts = new ArrayList<>();
    List<OwnPostEntity> ownPostEntities = postRepository.findByOwnPost(userId);

    for (OwnPostEntity ownPostEntity : ownPostEntities) {
      Content content =
          new Content(
              ownPostEntity.getDescription(), ownPostEntity.getImagePath(), ownPostEntity.getAlt());
      OwnPost ownPost =
          new OwnPost(ownPostEntity.getPostId(), iconPath, content, ownPostEntity.getLikeCount());
      ownPosts.add(ownPost);
    }
    return ownPosts;
  }

  /**
   * 指定されたユーザーIDの「いいね」済み投稿一覧を取得する。
   *
   * @param userId いいねした投稿を取得する対象ユーザーのID
   * @return 指定ユーザーの「いいね」済み投稿一覧
   */
  public List<LikedPost> getLikedPosts(UUID userId) {
    List<LikedPost> likedPosts = new ArrayList<>();
    List<LikedPostEntity> likedPostEntities = postRepository.findByLikedPost(userId);

    for (LikedPostEntity likedPostEntity : likedPostEntities) {
      Content content =
          new Content(
              likedPostEntity.getDescription(),
              likedPostEntity.getImagePath(),
              likedPostEntity.getAlt());
      LikedPost likedPost =
          new LikedPost(
              likedPostEntity.getPostId(),
              likedPostEntity.getIconPath(),
              content,
              likedPostEntity.getUserId(),
              likedPostEntity.getName());
      likedPosts.add(likedPost);
    }
    return likedPosts;
  }

  /**
   * 指定されたユーザーIDのソーシャルアカウント一覧を取得する。
   *
   * @param targetUserId ソーシャルアカウントを取得する対象ユーザーのID
   * @return 指定ユーザーのソーシャルアカウント一覧
   */
  public List<SocialAccount> getSocialAccounts(UUID targetUserId) {
    List<SocialAccountEntity> socialAccountEntities =
        socialAccountRepository.findByUserId(targetUserId);
    List<SocialAccount> socialAccounts = new ArrayList<>();
    for (SocialAccountEntity entity : socialAccountEntities) {
      String platformName = PlatformConstant.PLATFORM_LIST.get(entity.getPlatformId());
      String identifier = entity.getLink();
      SocialAccount account = new SocialAccount(platformName, identifier);
      socialAccounts.add(account);
    }
    return socialAccounts;
  }

  /**
   * 指定されたユーザーIDのユーザー設定情報を取得する。
   *
   * @param userId 設定情報を取得する対象ユーザーのID
   * @return 指定ユーザーの設定情報
   */
  public UserSettingResponse showUserSetting(UUID userId) {
    UserSetting userSetting = userSettingRepository.findByUserId(userId);
    if (userSetting == null) {
      throw new InvalidParameterException("User setting not found for user ID: " + userId);
    }

    UserSettingResponse response = new UserSettingResponse();
    response.setDisplayId(userSetting.getDisplayId());
    response.setName(userSetting.getName());
    response.setIconPath(userSetting.getIconPath());
    response.setHeaderPath(userSetting.getHeaderPath());
    response.setIntroduction(userSetting.getIntroduction());
    response.setBirthday(userSetting.getBirthday());
    response.setShowAdultContent(userSetting.isShowAdultContent());
    response.setSocialAccounts(getSocialAccounts(userId));

    return response;
  }
}
