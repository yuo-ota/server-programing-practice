package jp.ac.dendai.spp.backend.controller;

import jp.ac.dendai.spp.backend.error.InvalidParameterException;
import jp.ac.dendai.spp.backend.form.request.RegisterRequest;
import jp.ac.dendai.spp.backend.form.response.ErrorResponse;
import jp.ac.dendai.spp.backend.service.PreRegisterService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/register")
public class RegisterController {
  private final PreRegisterService preRegisterService;

  public RegisterController(PreRegisterService preRegisterService) {
    this.preRegisterService = preRegisterService;
  }

  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid RegisterRequest request) {
    try {
      preRegisterService.registerProcess(request);

      return ResponseEntity.status(HttpStatus.CREATED).build();
      
    } catch (InvalidParameterException e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("INVALID_PARAMETER");
      errorResponse.setMessage("無効なパラメータが指定されました。");

      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

    } catch (Exception e) {
      ErrorResponse errorResponse = new ErrorResponse();

      errorResponse.setCode("SERVICE_ERROR");
      errorResponse.setMessage("サーバー内部で予期せぬエラーが発生しました。");

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }
}
