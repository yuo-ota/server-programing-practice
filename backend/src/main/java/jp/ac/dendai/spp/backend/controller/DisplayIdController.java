package jp.ac.dendai.spp.backend.controller;

import jp.ac.dendai.spp.backend.form.request.CheckIdUsedRequest;
import jp.ac.dendai.spp.backend.form.response.CheckIdUsedResponse;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.DisplayIdService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user/check-id")
public class DisplayIdController {
  private final DisplayIdService displayService;

  public DisplayIdController(DisplayIdService displayService) {
    this.displayService = displayService;
  }

  @GetMapping("/{userId}")
  public ResponseEntity<?> check(CheckIdUsedRequest request) {
    try {
      CheckIdUsedResponse response = displayService.check(request);

      return ResponseEntity.ok(response);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
