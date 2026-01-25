INSERT INTO user_settings (user_id, display_id, name, birthday, show_adult_content)
SELECT
  user_id,
  CONCAT('user', ROW_NUMBER() OVER (ORDER BY email_address)) AS display_id,
  CONCAT('User ', ROW_NUMBER() OVER (ORDER BY email_address)) AS name,
  DATE '1990-01-01' + (INTERVAL '1 day' * FLOOR(RANDOM() * 10000)) AS birthday,
  FALSE AS show_adult_content
FROM users;