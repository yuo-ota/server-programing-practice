package jp.ac.dendai.spp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import jp.ac.dendai.spp.backend.constant.CommonConstant;
import jp.ac.dendai.spp.backend.constant.ImageConstant;
import jp.ac.dendai.spp.backend.constant.PlatformConstant;
import jp.ac.dendai.spp.backend.constant.TokenConstant;
import jp.ac.dendai.spp.backend.dto.Content;
import jp.ac.dendai.spp.backend.dto.LikedPost;
import jp.ac.dendai.spp.backend.dto.OwnPost;
import jp.ac.dendai.spp.backend.dto.PostIdAndCount;
import jp.ac.dendai.spp.backend.dto.SocialAccount;
import jp.ac.dendai.spp.backend.entity.ImageEntity;
import jp.ac.dendai.spp.backend.entity.Post;
import jp.ac.dendai.spp.backend.entity.PreRegisterToken;
import jp.ac.dendai.spp.backend.entity.SocialAccountEntity;
import jp.ac.dendai.spp.backend.entity.User;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateUserRequest;
import jp.ac.dendai.spp.backend.form.request.ShowUserRequest;
import jp.ac.dendai.spp.backend.form.request.UpdateUserRequest;
import jp.ac.dendai.spp.backend.form.response.UserDataResponse;
import jp.ac.dendai.spp.backend.repository.ImageRepository;
import jp.ac.dendai.spp.backend.repository.LikeRepository;
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
  private final PreRegisterTokenRepository preRegisterTokenRepository;
  private final ImageRepository imageRepository;
  private final LikeRepository likeRepository;

  public UserService(
      AuthService authService,
      TokenService tokenService,
      UserRepository userRepository,
      UserSettingRepository userSettingRepository,
      SocialAccountRepository socialAccountRepository,
      DisplayIdService displayIdService,
      PreRegisterTokenRepository preRegisterTokenRepository,
      PostRepository postRepository,
      ImageRepository imageRepository,
      LikeRepository likeRepository) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
    this.userSettingRepository = userSettingRepository;
    this.socialAccountRepository = socialAccountRepository;
    this.displayIdService = displayIdService;
    this.preRegisterTokenRepository = preRegisterTokenRepository;
    this.postRepository = postRepository;
    this.imageRepository = imageRepository;
    this.likeRepository = likeRepository;
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

  @Transactional
  public void delete(UUID userId) {
    User user = userRepository.findByUserId(userId);
    if (user == null) {
      throw new InvalidParameterException("User data not found for authenticated ID.");
    }
    userRepository.deleteById(userId);
  }

  public UserDataResponse show(UUID userId, ShowUserRequest request) {
    String targetDisplayId = request.getUserId();
    UserSetting targetUserSetting = userSettingRepository.findByDisplayId(targetDisplayId);
    if (targetUserSetting == null) {
      throw new InvalidParameterException("Target user not found with ID: " + targetDisplayId);
    }
    UUID targetUserId = targetUserSetting.getUserId();

    UserDataResponse response = new UserDataResponse();
    response.setName(targetUserSetting.getName());
    response.setIconPath(targetUserSetting.getIconPath());
    response.setHeaderPath(targetUserSetting.getHeaderPath());

    List<SocialAccountEntity> socialAccountEntities =
        socialAccountRepository.findByUserId(targetUserId);
    List<SocialAccount> socialAccounts = new ArrayList<>();
    for (SocialAccountEntity entity : socialAccountEntities) {
      String platformName = PlatformConstant.PLATFORM_LIST.get(entity.getPlatformId());
      String identifier = entity.getLink();
      SocialAccount account = new SocialAccount(platformName, identifier);
      socialAccounts.add(account);
    }
    response.setSocialAccounts(socialAccounts);

    List<Post> posts = postRepository.findByCreatorId(targetUserId);
    List<OwnPost> ownPosts = new ArrayList<>();
    List<ImageEntity> imageEntities =
        imageRepository.findByPostIds(posts.stream().map(Post::getId).toArray(UUID[]::new));
    List<PostIdAndCount> likeCountList =
        likeRepository.countBypostIds(posts.stream().map(Post::getId).toArray(UUID[]::new));

    Map<UUID, Long> countMap =
        likeCountList.stream()
            .collect(Collectors.toMap(PostIdAndCount::postId, PostIdAndCount::count));
    List<Post> sortedPosts = sortPostsByPostId(posts, posts.stream().map(Post::getId).toList());
    Map<Post, ImageEntity> sortedImages = sortImageByPost(sortedPosts, imageEntities);

    for (int i = 0; i < sortedPosts.size(); i++) {
      UUID postId = sortedPosts.get(i).getId();
      String iconPath = targetUserSetting.getIconPath();
      Content content =
          new Content(
              sortedPosts.get(i).getDescription(),
              sortedImages.get(sortedPosts.get(i)).getPath(),
              sortedImages.get(sortedPosts.get(i)).getAlt());
      int likeCount = countMap.getOrDefault(postId, 0L).intValue();
      OwnPost ownPost = new OwnPost(postId, iconPath, content, likeCount);
      ownPosts.add(ownPost);
    }
    response.setPosts(ownPosts);

    if (userId != null && userId.equals(targetUserId)) {
      List<UUID> likedPostIds = likeRepository.findPostIdsByUserId(userId);
      List<Post> likedPostsEntity = postRepository.findAllById(likedPostIds);
      List<UserSetting> likedUserSettings =
          userSettingRepository.findByUserIds(
              likedPostsEntity.stream().map(Post::getCreatorId).toArray(UUID[]::new));
      List<LikedPost> likedPosts = new ArrayList<>();
      List<ImageEntity> likedImageEntities =
          imageRepository.findByPostIds(
              likedPostsEntity.stream().map(Post::getId).toArray(UUID[]::new));

      List<Post> sortedLikedPosts = sortPostsByPostId(likedPostsEntity, likedPostIds);
      Map<Post, ImageEntity> sortedLikedImages =
          sortImageByPost(sortedLikedPosts, likedImageEntities);
      Map<Post, UserSetting> sortedLikedUserSettings =
          sortUserSettingByPost(sortedLikedPosts, likedUserSettings);

      System.out.println(
          "sortedLikedUserSettings: " + sortedLikedUserSettings.get(sortedLikedPosts.get(0)));
      for (int i = 0; i < sortedLikedPosts.size(); i++) {
        UUID postId = sortedLikedPosts.get(i).getId();
        String iconPath = sortedLikedUserSettings.get(sortedLikedPosts.get(i)).getIconPath();
        Content content =
            new Content(
                sortedLikedPosts.get(i).getDescription(),
                sortedLikedImages.get(sortedLikedPosts.get(i)).getPath(),
                sortedLikedImages.get(sortedLikedPosts.get(i)).getAlt());
        LikedPost likedPost =
            new LikedPost(
                postId,
                iconPath,
                content,
                likedUserSettings.get(i).getDisplayId(),
                likedUserSettings.get(i).getName());
        likedPosts.add(likedPost);
      }
      response.setLikedPosts(likedPosts);
    }

    return response;
  }

  public List<Post> sortPostsByPostId(List<Post> posts, List<UUID> postIds) {
    Map<UUID, Post> postMap = posts.stream().collect(Collectors.toMap(Post::getId, post -> post));
    List<Post> sortedPosts = new ArrayList<>();
    for (UUID postId : postIds) {
      Post post = postMap.get(postId);
      if (post != null) {
        sortedPosts.add(post);
      }
    }
    return sortedPosts;
  }

  public Map<Post, ImageEntity> sortImageByPost(List<Post> posts, List<ImageEntity> images) {
    Map<UUID, ImageEntity> imageMap =
        images.stream().collect(Collectors.toMap(ImageEntity::getPostId, image -> image));
    Map<Post, ImageEntity> sortedImages = new HashMap<>();
    for (Post post : posts) {
      ImageEntity image = imageMap.get(post.getId());
      if (image != null) {
        sortedImages.put(post, image);
      }
    }
    return sortedImages;
  }

  public Map<Post, UserSetting> sortUserSettingByPost(
      List<Post> posts, List<UserSetting> userSettings) {
    Map<UUID, UserSetting> userSettingMap =
        userSettings.stream().collect(Collectors.toMap(UserSetting::getUserId, setting -> setting));
    Map<Post, UserSetting> sortedUserSettings = new HashMap<>();
    for (Post post : posts) {
      UserSetting setting = userSettingMap.get(post.getCreatorId());
      if (setting != null) {
        sortedUserSettings.put(post, setting);
      }
    }
    return sortedUserSettings;
  }
}
