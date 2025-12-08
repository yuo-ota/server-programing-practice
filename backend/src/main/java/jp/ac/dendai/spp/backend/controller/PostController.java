package jp.ac.dendai.spp.backend.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.CreatePostRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.form.response.ShowPostResponse;
import jp.ac.dendai.spp.backend.service.AuthService;
import jp.ac.dendai.spp.backend.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/post")
public class PostController {
  private final PostService postService;
  private final AuthService authService;

  public PostController(PostService postService, AuthService authService) {
    this.postService = postService;
    this.authService = authService;
  }

  @PostMapping
  public ResponseEntity<?> create(
      @CookieValue("token") String token, @ModelAttribute @Valid CreatePostRequest request) {
    try {
      UUID userId = authService.auth(token);
      postService.createPost(userId, request);

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
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  @GetMapping
  public ResponseEntity<?> show(
      @CookieValue("token") String token, @RequestParam("date") LocalDate date) {
    try {
      UUID userId = authService.auth(token);
      List<ShowPostResponse> responses = postService.showPost(userId, date);

      return ResponseEntity.status(HttpStatus.OK).body(responses);

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
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  @GetMapping("/{postId}")
  public ResponseEntity<?> show(
      @CookieValue("token") String token, @PathVariable("postId") UUID postId) {
    try {
      UUID userId = authService.auth(token);
      ShowPostResponse response = postService.showSinglePost(userId, postId);

      return ResponseEntity.status(HttpStatus.OK).body(response);

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
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  @DeleteMapping("/{postId}")
  public ResponseEntity<?> delete(
      @CookieValue("token") String token, @PathVariable("postId") UUID postId) {
    try {
      UUID userId = authService.auth(token);
      postService.deletePost(userId, postId);

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

      errorResponse.setCode("INTERNAL_SERVER_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
