package jp.ac.dendai.spp.backend.util;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JWTbuilder {
    private static final Long EXPIRATION_TIME = 1000L * 60L * 60L * 1L;
    private final String secret;

    public JWTbuilder(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }
    
    /**
     * JWTトークンを生成する
     * @param userId
     * @return
     */
    public String build(UUID userId){
        
        //生成のため、日時データを取得する
        Date issuedAt = new Date();
        Date notBefore = new Date(issuedAt.getTime());
        Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);
        
        //ヘッダー部へのアルゴリズムとハッシュ値を指定する
        Algorithm algorithm = Algorithm.HMAC256(secret);
        
        //トークンの生成
        String token = JWT.create()
                .withIssuer("spp")  //トークン発行者情報
                .withSubject(userId.toString()) //ユーザーID
                .withIssuedAt(issuedAt)     //発行日時
                .withNotBefore(notBefore)   //トークンの有効期間開始時間
                .withExpiresAt(expiresAt)   //トークンの有効期間終了時間 今回はログアウト、セッションタイムアウトまで保持
                .sign(algorithm);           //アルゴリズム指定して、署名を行う
        return token;
    }
}