package jp.ac.dendai.spp.backend.service;

import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.form.request.CheckIdUsedRequest;
import jp.ac.dendai.spp.backend.form.response.CheckIdUsedResponse;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import org.springframework.stereotype.Service;

@Service
public class DisplayIdService {
  private UserSettingRepository userSettingRepository;

  public DisplayIdService(UserSettingRepository userSettingRepository) {
    this.userSettingRepository = userSettingRepository;
  }

  public CheckIdUsedResponse check(CheckIdUsedRequest request) {
    UserSetting userSetting = userSettingRepository.findByDisplayId(request.getUserId());
    CheckIdUsedResponse response = new CheckIdUsedResponse();
    if (userSetting == null) {
      response.setAvailable(true);
      return response;
    }
    response.setAvailable(false);
    return response;
  }
}
