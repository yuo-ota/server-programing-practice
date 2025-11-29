package jp.ac.dendai.spp.backend.controller;

import jakarta.validation.Valid;
import java.util.UUID;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.LikeRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.LikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/like")
public class LikeController {
  private final AuthService authService;
  private final LikeService likeService;

  public LikeController(AuthService authService, LikeService likeService) {
    this.authService = authService;
    this.likeService = likeService;
  }

  @PostMapping("/{postId}")
  public ResponseEntity<?> create(
      @RequestHeader("Authorization") String token, @Valid LikeRequest request) {
    try {
      UUID userId = authService.auth(token);
      likeService.createLike(userId, request);

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

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<?> delete(
      @RequestHeader("Authorization") String token, @Valid LikeRequest request) {
    try {
      UUID userId = authService.auth(token);
      likeService.deleteLike(userId, request);

      return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
