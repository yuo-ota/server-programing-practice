package jp.ac.dendai.spp.backend.service;

import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.form.request.CheckIdUsedRequest;
import jp.ac.dendai.spp.backend.form.response.CheckIdUsedResponse;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;

@Service
public class DisplayIdService {
  private final UserSettingRepository userSettingRepository;

  public DisplayIdService(UserSettingRepository userSettingRepository) {
    this.userSettingRepository = userSettingRepository;
  }

  public CheckIdUsedResponse check(CheckIdUsedRequest request) {
    CheckIdUsedResponse response = new CheckIdUsedResponse();
    response.setAvailable(!isUsed(request.getUserId()));
    return response;
  }

  public boolean isUsed(String displayId) {
    UserSetting userSetting = userSettingRepository.findByDisplayId(displayId);
    return userSetting != null;
  }
}
