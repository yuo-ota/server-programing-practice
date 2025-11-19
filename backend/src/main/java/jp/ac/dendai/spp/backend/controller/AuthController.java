package jp.ac.dendai.spp.backend.controller;

import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.AdminAuthRequest;
import jp.ac.dendai.spp.backend.form.request.AuthRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class AuthController {
  private final AuthService authService;
  private final TokenService tokenService;

  public AuthController(AuthService authService, TokenService tokenService) {
    this.authService = authService;
    this.tokenService = tokenService;
  }

  @PostMapping("/auth")
  public ResponseEntity<?> auth(AuthRequest request) {
    try {
      tokenService.isAvailable(request);

      return ResponseEntity.ok().build();

    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INVALID_PARAMETER");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  @PostMapping("/admin/auth")
  public ResponseEntity<?> auth(AdminAuthRequest request) {
    try {
      authService.adminAuth(request);

      return ResponseEntity.ok().build();

    } catch (AuthenticationFailedException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("AUTHENTICATION_FAILED");
      errorResponse.setMessage(e.getMessage());

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
