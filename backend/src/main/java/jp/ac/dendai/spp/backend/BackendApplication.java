package jp.ac.dendai.spp.backend;

import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class BackendApplication {

  public static void main(String[] args) {
    String timezone = System.getenv("TIMEZONE");
    TimeZone.setDefault(TimeZone.getTimeZone(timezone));

    SpringApplication.run(BackendApplication.class, args);
  }
}
