package jp.ac.dendai.spp.backend.service;

import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.PenaltyConstant;
import jp.ac.dendai.spp.backend.entity.Penalty;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.form.request.CreatePenaltyRequest;
import jp.ac.dendai.spp.backend.repository.PenaltyRepository;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;

@Service
public class PenaltyService {
  private final PenaltyRepository penaltyRepository;
  private final UserSettingRepository userSettingRepository;

  public PenaltyService(
      PenaltyRepository penaltyRepository, UserSettingRepository userSettingRepository) {
    this.penaltyRepository = penaltyRepository;
    this.userSettingRepository = userSettingRepository;
  }

  /**
   * 処分作成
   *
   * @param userId
   * @param request
   */
  public void createPenalty(UUID userId, CreatePenaltyRequest request) {
    UserSetting penalizedUser = userSettingRepository.findByDisplayId(request.getPenalizedUserId());
    if (penalizedUser == null) {
      throw new IllegalArgumentException("Penalized user not found");
    }

    int penaltyStatusId = PenaltyConstant.PLATFORM_LIST.indexOf(request.getType());
    if (penaltyStatusId == -1) {
      throw new IllegalArgumentException("Invalid penalty type");
    }

    Penalty penalty =
        new Penalty(
            penaltyStatusId,
            penalizedUser.getUserId(),
            userId,
            request.getDuration(),
            request.getDurationUnit(),
            request.getReason());

    penaltyRepository.save(penalty);
  }
}
