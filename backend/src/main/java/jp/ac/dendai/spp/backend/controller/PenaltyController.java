package jp.ac.dendai.spp.backend.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreatePenaltyRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.PenaltyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/penalty")
public class PenaltyController {
  private final PenaltyService penaltyService;
  private final AuthService authService;

  public PenaltyController(PenaltyService penaltyService, AuthService authService) {
    this.penaltyService = penaltyService;
    this.authService = authService;
  }

  @PostMapping
  public ResponseEntity<?> createPenalty(
      @RequestHeader("Authorization") String token,
      @RequestBody @Valid CreatePenaltyRequest request) {
    try {
      UUID userId = authService.adminAuth(token);
      penaltyService.createPenalty(userId, request);

      return ResponseEntity.status(HttpStatus.CREATED).build();

    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("BAD_REQUEST_PARAM");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage("ユーザー認証に失敗しました。");

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INTERNAL_SERVER_ERROR");
      errorResponse.setMessage("サーバー内部でエラーが発生しました。");

      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
