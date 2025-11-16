package jp.ac.dendai.spp.backend.service;

import jakarta.transaction.Transactional;
import jp.ac.dendai.spp.backend.repository.UserSettingRepository;
import jp.ac.dendai.spp.backend.entity.UserSetting;
import jp.ac.dendai.spp.backend.form.request.CheckIdUsedRequest;
import jp.ac.dendai.spp.backend.form.response.CheckIdUsedResponse;

@Transactional
public class DisplayIdService {
    private UserSettingRepository userSettingRepository;

    public CheckIdUsedResponse check(CheckIdUsedRequest request) {
        UserSetting userSetting = userSettingRepository.findByDisplayId(request.getUserId());
        CheckIdUsedResponse response = new CheckIdUsedResponse();
        response.setAvailable(userSetting == null);
        return response;
    }
}
