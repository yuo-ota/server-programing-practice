package jp.ac.dendai.spp.backend.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;
import jp.ac.dendai.spp.backend.constant.ImageConstant;
import org.springframework.web.multipart.MultipartFile;

/**
 * Utility class for processing and saving image files to the server.
 *
 * <p>Provides methods to handle image uploads, generate unique filenames, ensure target directories
 * exist, and save images to disk.
 */
public class ImageManager {

  /**
   * Processes and saves an uploaded image file to the server.
   *
   * <p>Generates a unique filename using UUID, ensures the target directory exists, and saves the
   * image file to disk. Returns the absolute path to the saved image.
   *
   * @param image the uploaded image file (must not be null or empty)
   * @param imageTypeKey the key representing the image type, used to determine the target directory
   * @return the absolute path to the saved image file
   * @throws IOException if an I/O error occurs during saving or directory creation, or if a unique
   *     filename cannot be generated after several attempts
   * @throws IllegalArgumentException if the image is empty or the imageTypeKey is invalid
   * @throws NullPointerException if the image or its original filename is null
   */
  public static String processAndSaveImage(MultipartFile image, String imageTypeKey)
      throws IOException {
    Objects.requireNonNull(image, "Image file must not be null");
    if (image.isEmpty()) {
      throw new IllegalArgumentException("Image file is empty");
    }
    String absoluteDirStr = ImageConstant.IMAGE_TYPE_MAP.get(imageTypeKey);
    if (absoluteDirStr == null) {
      throw new IllegalArgumentException("Invalid image type key: " + imageTypeKey);
    }

    String originalFilename =
        Objects.requireNonNull(image.getOriginalFilename(), "Original filename must not be null.");
    String extension = getFileExtension(originalFilename);

    if (!isAllowedExtension(extension)) {
      throw new IllegalArgumentException("Unsupported image extension: " + extension);
    }

    long size = image.getSize();
    if (size > ImageConstant.MAX_FILE_SIZE_BYTES) {
      throw new IllegalArgumentException(
          "Image file is too large: "
              + size
              + " bytes (max "
              + ImageConstant.MAX_FILE_SIZE_BYTES
              + " bytes)");
    }

    Path dir = ensureDirectoryExists(absoluteDirStr);

    for (int attempt = 0; attempt < ImageConstant.MAX_FILENAME_GENERATION_ATTEMPTS; attempt++) {
      String newFilename = generateUuidFilename(extension);
      Path targetPath = dir.resolve(newFilename);

      if (Files.exists(targetPath)) {
        continue;
      }

      try (var is = image.getInputStream()) {
        Files.copy(is, targetPath);
      }

      return absoluteDirStr + "/" + newFilename;
    }

    throw new IOException(
        "Failed to generate a unique filename after "
            + ImageConstant.MAX_FILENAME_GENERATION_ATTEMPTS
            + " attempts.");
  }

  // UUIDを用いて一意なファイル名を生成する
  private static String generateUuidFilename(String extension) {
    String uuid = UUID.randomUUID().toString();
    if (extension == null || extension.isEmpty()) {
      return uuid;
    }
    String cleanExt = extension.startsWith(".") ? extension.substring(1) : extension;
    return uuid + "." + cleanExt;
  }

  // 指定したディレクトリが存在しない場合は作成する
  private static Path ensureDirectoryExists(String imagesDir) throws IOException {
    Path dir = Paths.get(imagesDir);
    if (Files.notExists(dir)) {
      Files.createDirectories(dir);
    }
    return dir;
  }

  // ファイル名から拡張子を取得する
  private static String getFileExtension(String filename) {
    int dotIndex = filename.lastIndexOf('.');
    if (dotIndex > 0 && dotIndex < filename.length() - 1) {
      return filename.substring(dotIndex + 1).toLowerCase();
    }
    return "";
  }

  // 許可された拡張子かどうかを判定する（Twitterで一般的に使用される画像拡張子を参考）
  private static boolean isAllowedExtension(String extension) {
    if (extension == null || extension.isEmpty()) {
      return false;
    }
    String ext =
        extension.startsWith(".") ? extension.substring(1).toLowerCase() : extension.toLowerCase();
    return ImageConstant.ALLOWED_EXTENSIONS.contains(ext);
  }
}
