package jp.ac.dendai.spp.backend.service;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.ReportConstant;
import jp.ac.dendai.spp.backend.dto.Report;
import jp.ac.dendai.spp.backend.entity.AdminUser;
import jp.ac.dendai.spp.backend.entity.ReportEntity;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateReportRequest;
import jp.ac.dendai.spp.backend.form.response.ReportResponse;
import jp.ac.dendai.spp.backend.repository.AdminUserRepository;
import jp.ac.dendai.spp.backend.repository.ReportRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {
  private final ReportRepository reportRepository;
  private final UserSettingRepository userSettingRepository;
  private final AdminUserRepository adminUserRepository;

  public ReportService(
      ReportRepository reportRepository,
      UserSettingRepository userSettingRepository,
      AdminUserRepository adminUserRepository) {
    this.reportRepository = reportRepository;
    this.userSettingRepository = userSettingRepository;
    this.adminUserRepository = adminUserRepository;
  }

  /**
   * 報告作成
   *
   * @param userId
   * @param request
   */
  public void createReport(UUID userId, CreateReportRequest request) {
    if (request.getReporteeUser() != null) {
      createUserReport(userId, request);
    } else if (request.getReporteePost() != null) {
      createPostReport(userId, request);
    } else {
      throw new InvalidParameterException("報告対象が指定されていません。");
    }
  }

  /**
   * ユーザ報告作成
   *
   * @param userId
   * @param request
   */
  @Transactional
  public void createUserReport(UUID userId, CreateReportRequest request) {
    UserSetting reporteeUserSetting =
        userSettingRepository.findByDisplayId(request.getReporteeUser());
    if (reporteeUserSetting == null) {
      throw new InvalidParameterException("User not found");
    }

    UUID reporteeUserId = reporteeUserSetting.getUserId();
    List<Integer> categoryStatusId =
        mapCategoryStatus(request.getReportType(), ReportConstant.REPORT_USER_CATEGORIES_LIST);

    ReportEntity report =
        new ReportEntity(userId, true, reporteeUserId, null, categoryStatusId, request.getDetail());

    reportRepository.save(report);
  }

  /**
   * 投稿報告作成
   *
   * @param userId
   * @param request
   */
  @Transactional
  public void createPostReport(UUID userId, CreateReportRequest request) {
    List<Integer> categoryStatusId =
        mapCategoryStatus(request.getReportType(), ReportConstant.REPORT_POST_CATEGORIES_LIST);

    ReportEntity report =
        new ReportEntity(
            userId, false, null, request.getReporteePost(), categoryStatusId, request.getDetail());

    reportRepository.save(report);
  }

  /**
   * 報告カテゴリをIDにマッピングします。
   *
   * @param reportTypes 報告カテゴリの名前の配列
   * @param categoriesList 有効な報告カテゴリ名のリスト
   * @return 報告カテゴリ名に対応するカテゴリIDのリスト
   */
  public List<Integer> mapCategoryStatus(String[] reportTypes, List<String> categoriesList) {
    List<Integer> categoryStatusId = new ArrayList<>();
    for (String type : reportTypes) {
      int index = categoriesList.indexOf(type);
      if (index != -1 && !categoryStatusId.contains(index)) {
        categoryStatusId.add(index);
      } else {
        throw new InvalidParameterException("無効な報告カテゴリが含まれています: " + type);
      }
    }
    return categoryStatusId;
  }

  /**
   * 報告一覧取得（管理者のみ）
   *
   * @param userId ユーザーID(管理者確認用)
   * @return 報告一覧レスポンス
   * @throws AccessDeniedException 管理者権限がない場合
   */
  @Transactional(readOnly = true)
  public ReportResponse index(UUID userId) throws AccessDeniedException {
    AdminUser adminUser = adminUserRepository.findByUserId(userId);
    if (adminUser == null) {
      throw new AccessDeniedException("管理者権限がありません。通報一覧は管理者のみが取得可能です。");
    }

    List<ReportEntity> reportEntities = reportRepository.findAll();

    // レスポンス用 DTO に変換
    List<Report> reportDtos = new ArrayList<>();
    for (ReportEntity reportEntity : reportEntities) {
      Report reportDto = convertToReportDto(reportEntity);
      reportDtos.add(reportDto);
    }

    ReportResponse response = new ReportResponse();
    response.setReports(reportDtos);
    return response;
  }

  /**
   * Report エンティティを Report DTO に変換する。
   *
   * @param reportEntity 報告エンティティ
   * @return 報告 DTO
   */
  private Report convertToReportDto(ReportEntity reportEntity) {
    UUID id = reportEntity.getId();
    String reporter = getUserDisplayId(reportEntity.getReporter());
    String summary = buildReportSummary(reportEntity);
    String details = reportEntity.getDetails();

    Report reportDto = new Report(id, reporter, summary, details);
    return reportDto;
  }

  /**
   * ユーザーID からユーザーの表示名（display_id）を取得する。
   *
   * @param userId ユーザーID
   * @return 表示名（取得できない場合はユーザーID の文字列表現）
   */
  private String getUserDisplayId(UUID userId) {
    if (userId == null) {
      return null;
    }
    UserSetting userSetting = userSettingRepository.findByUserId(userId);
    return userSetting != null ? userSetting.getDisplayId() : userId.toString();
  }

  /**
   * 報告サマリーを生成する。
   *
   * @param reportEntity 報告エンティティ
   * @return サマリー文字列（ユーザー報告または投稿報告の別）
   */
  private String buildReportSummary(ReportEntity reportEntity) {
    if (reportEntity.isReportUser()) {
      return ReportConstant.REPORTED_ACCOUNT;
    } else {
      return ReportConstant.REPORTED_POST;
    }
  }
}
