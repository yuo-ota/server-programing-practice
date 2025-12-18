package jp.ac.dendai.spp.backend.controller;

import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.form.response.NotificationResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/notification")
public class NotificationController {
  private final NotificationService notificationService;
  private final AuthService authService;

  public NotificationController(NotificationService notificationService, AuthService authService) {
    this.notificationService = notificationService;
    this.authService = authService;
  }

  @GetMapping
  public ResponseEntity<?> show(@RequestHeader("Authorization") String token) {
    try {
      UUID userId = authService.auth(token);

      List<NotificationResponse> response = notificationService.show(userId);

      return ResponseEntity.ok(response);
    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage("ユーザー認証に失敗しました。");

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("BAD_REQUEST_PARAM");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INTERNAL_SERVICE_ERROR");
      e.printStackTrace();
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
