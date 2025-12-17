package jp.ac.dendai.spp.backend.controller;

import jakarta.validation.Valid;
import java.nio.file.AccessDeniedException;
import java.util.UUID;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreateReportRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.form.response.ReportResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/report")
public class ReportController {
  private final ReportService reportService;
  private final AuthService authService;

  public ReportController(ReportService reportService, AuthService authService) {
    this.reportService = reportService;
    this.authService = authService;
  }

  @PostMapping
  public ResponseEntity<?> createReport(
      @CookieValue("token") String token, @RequestBody @Valid CreateReportRequest request) {
    try {
      UUID userId = authService.auth(token);
      reportService.createReport(userId, request);

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

  @GetMapping
  public ResponseEntity<?> index(@CookieValue("token") String token) {
    try {
      UUID userId = authService.auth(token);
      ReportResponse response = reportService.index(userId);
      return ResponseEntity.ok(response);
    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage("ユーザー認証に失敗しました。");

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    } catch (AccessDeniedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("FORBIDDEN");
      errorResponse.setMessage("管理者権限がありません。");

      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("BAD_REQUEST_PARAM");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INTERNAL_SERVER_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
