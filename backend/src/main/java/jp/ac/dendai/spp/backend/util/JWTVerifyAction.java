package jp.ac.dendai.spp.backend.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

public final class JWTVerifyAction {
  private Algorithm algorithm;

  private JWTVerifyAction(Algorithm algorithm) {
    this.algorithm = algorithm;
  }

  public static JWTVerifyAction of(Algorithm algorithm) {
    return new JWTVerifyAction(algorithm);
  }

  public DecodedJWT verifyRead(String token)
      throws TokenExpiredException, JWTVerificationException {
    JWTVerifier verifier = JWT.require(algorithm).build();

    // 署名・有効期限を検証
    return verifier.verify(token);
  }
}
