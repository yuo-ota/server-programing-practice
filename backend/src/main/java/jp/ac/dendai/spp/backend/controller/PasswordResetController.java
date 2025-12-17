package jp.ac.dendai.spp.backend.controller;

import jakarta.validation.Valid;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreatePasswordResetEmailRequest;
import jp.ac.dendai.spp.backend.form.request.PasswordResetRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.PasswordResetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/password-reset")
public class PasswordResetController {
  private final PasswordResetService passwordResetService;

  public PasswordResetController(PasswordResetService passwordResetService) {
    this.passwordResetService = passwordResetService;
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody CreatePasswordResetEmailRequest request) {
    try {
      passwordResetService.registerProcess(request);
    } catch (AuthenticationFailedException e) {
    } catch (Exception e) {
    }

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @PatchMapping
  public ResponseEntity<?> update(@Valid @RequestBody PasswordResetRequest request) {
    try {
      passwordResetService.resetPassword(request);

      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INVALID_PARAMETER");
      errorResponse.setMessage("無効なパラメータが指定されました。");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage("ユーザー認証に失敗しました。");

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INTERNAL_SERVER_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
