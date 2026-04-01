package jp.ac.dendai.spp.backend.util;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class DiscordWebhookSender {
  public static void notify(String[] roleIds, String description, String log) {
    try {
      sendWebhookWithEmbed(roleIds, description, log);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public static void sendWebhookWithEmbed(String[] roleIds, String title, String log)
      throws Exception {
    String webhookUrl = System.getenv("DISCORD_WEBHOOK_URL");
    String boundary = "----DiscordBoundary" + System.currentTimeMillis();
    String filename = "error_log.txt";

    if (webhookUrl == null || webhookUrl.isEmpty()) {
      return;
    }

    URL url = new URI(webhookUrl).toURL();
    HttpURLConnection con = (HttpURLConnection) url.openConnection();

    con.setRequestMethod("POST");
    con.setDoOutput(true);
    con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

    try (OutputStream os = con.getOutputStream()) {
      // --- payload_json ---
      String payloadPart =
          "--"
              + boundary
              + "\r\n"
              + "Content-Disposition: form-data; name=\"payload_json\"\r\n"
              + "Content-Type: application/json\r\n\r\n"
              + String.format(
                  """
                    {
                      "content": "%s",
                      "embeds": [
                        {
                          "author": {
                            "name": "%s環境"
                          },
                          "title": "%s",
                          "color": 16722520,
                          "timestamp": "%s"
                        }
                      ]
                    }
                    """,
                  String.join("", roleIds),
                  System.getenv("SPRING_PROFILES_ACTIVE"),
                  escapeJson(title),
                  java.time.Instant.now().toString())
              + "\r\n";
      os.write(payloadPart.getBytes(StandardCharsets.UTF_8));

      // --- file ---
      if (log != null && !log.isEmpty()) {
        String fileHeader =
            "--"
                + boundary
                + "\r\n"
                + "Content-Disposition: form-data; name=\"file\"; filename=\""
                + filename
                + "\"\r\n"
                + "Content-Type: text/plain\r\n\r\n";
        os.write(fileHeader.getBytes(StandardCharsets.UTF_8));

        os.write(log.getBytes(StandardCharsets.UTF_8));
        os.write("\r\n".getBytes(StandardCharsets.UTF_8));
      }

      // --- end boundary ---
      os.write(("--" + boundary + "--").getBytes(StandardCharsets.UTF_8));
    }

    int responseCode = con.getResponseCode();
    System.out.println("Response Code: " + responseCode);

    if (responseCode != HttpURLConnection.HTTP_NO_CONTENT
        && responseCode != HttpURLConnection.HTTP_OK) {
      throw new RuntimeException("Failed: HTTP " + responseCode);
    }

    con.disconnect();
  }

  private static String escapeJson(String input) {
    if (input == null) return "";
    return input
        .replace("\\", "\\\\")
        .replace("\"", "\\\"")
        .replace("\n", "\\n")
        .replace("\r", "\\r")
        .replace("\t", "\\t");
  }

  public static String expandException(Exception e) {
    StringBuilder sb = new StringBuilder();

    sb.append(e.toString()).append("\n");
    for (StackTraceElement element : e.getStackTrace()) {
      sb.append("\t").append(element.toString()).append("\n");
    }
    return sb.toString();
  }
}
