package jp.ac.dendai.spp.backend.controller;

import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.AuthRequest;
import jp.ac.dendai.spp.backend.form.request.LoginRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.TokenService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
      ResponseCookie cookie = authService.login(request);

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();

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

  @PostMapping("/admin/login")
  public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
    try {
      ResponseCookie cookie = authService.adminLogin(request);

      return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();

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

  @PostMapping("/auth/token")
  public ResponseEntity<?> auth(@RequestBody AuthRequest request) {
    try {
      tokenService.isAvailable(request);

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
  
  @PostMapping("/auth")
  public ResponseEntity<?> auth(@RequestHeader("Authorization") String token) {
    try {
      authService.auth(token);

      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

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

  @PostMapping("/admin/auth")
  public ResponseEntity<?> authAdmin(@RequestHeader("Authorization") String token) {
    try {
      authService.adminAuth(token);

      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

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
