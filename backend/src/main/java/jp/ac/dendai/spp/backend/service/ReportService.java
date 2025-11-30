package jp.ac.dendai.spp.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.ReportConstant;
import jp.ac.dendai.spp.backend.entity.Report;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateReportRequest;
import jp.ac.dendai.spp.backend.repository.ReportRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {
  private final ReportRepository reportRepository;
  private final UserSettingRepository userSettingRepository;

  public ReportService(
      ReportRepository reportRepository, UserSettingRepository userSettingRepository) {
    this.reportRepository = reportRepository;
    this.userSettingRepository = userSettingRepository;
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
    UUID reporteeUserId =
        userSettingRepository.findByDisplayId(request.getReporteeUser()).getUserId();
    List<Integer> categoryStatusId =
        mapCategoryStatus(request.getReportType(), ReportConstant.REPORT_USER_CATEGORIES_LIST);

    Report report =
        new Report(userId, true, reporteeUserId, null, categoryStatusId, request.getDetail());

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

    Report report =
        new Report(
            userId, false, null, request.getReporteePost(), categoryStatusId, request.getDetail());

    reportRepository.save(report);
  }
   * 報告カテゴリをIDにマッピングします。
   * @param reportTypes 報告カテゴリの名前の配列
   * @param categoriesList 有効な報告カテゴリ名のリスト
   * @return 報告カテゴリ名に対応するカテゴリIDのリスト
   * @param reportTypes
   * @param categoriesList
   * @return
   */
  public List<Integer> mapCategoryStatus(String[] reportTypes, List<String> categoriesList) {
    List<Integer> categoryStatusId = new ArrayList<>();
    for (String type : reportTypes) {
      int index = categoriesList.indexOf(type);
      if (index != -1) {
        categoryStatusId.add(index);
      } else {
        throw new InvalidParameterException("無効な報告カテゴリが含まれています: " + type);
      }
    }
    return categoryStatusId;
  }
}
