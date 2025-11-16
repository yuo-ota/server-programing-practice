package jp.ac.dendai.spp.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jp.ac.dendai.spp.backend.service.DisplayIdService;
import jp.ac.dendai.spp.backend.form.request.CheckIdUsedRequest;
import jp.ac.dendai.spp.backend.form.response.CheckIdUsedResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/user/check-id")
public class DisplayIdController {
    private DisplayIdService displayService;

    @GetMapping("/{userId}")
    public ResponseEntity<CheckIdUsedResponse> check(CheckIdUsedRequest request) {
        try {
            boolean isUsed = displayService.check(request).getAvailable() == false;
            CheckIdUsedResponse response = new CheckIdUsedResponse();
            response.setAvailable(!isUsed);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
