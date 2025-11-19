package jp.ac.dendai.spp.backend.error;

public class InvalidParameterException extends RuntimeException {

  public InvalidParameterException(String message) {
    super(message);
  }

  public InvalidParameterException(String message, Throwable cause) {
    super(message, cause);
  }
}
