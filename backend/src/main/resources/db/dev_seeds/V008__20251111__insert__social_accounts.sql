INSERT INTO social_accounts (user_id, platform_id, link)
SELECT
  user_id,
  FLOOR(RANDOM() * 5) AS platform_id,
  'https://social.example.com/user' AS link
FROM users;