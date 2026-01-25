package jp.ac.dendai.spp.backend.error;

public class AuthenticationFailedException extends RuntimeException {

  public AuthenticationFailedException(String message) {
    super(message);
  }

  public AuthenticationFailedException(String message, Throwable cause) {
    super(message, cause);
  }
}
