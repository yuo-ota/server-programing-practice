package jp.ac.dendai.spp.backend.controller;

import jp.ac.dendai.spp.backend.error.AuthenticationFailedException;
import jp.ac.dendai.spp.backend.form.request.CreatePasswordResetEmailRequest;
import jp.ac.dendai.spp.backend.service.PasswordResetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
