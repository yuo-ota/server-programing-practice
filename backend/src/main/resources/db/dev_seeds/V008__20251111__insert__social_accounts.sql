INSERT INTO social_accounts (user_id, platform_id)
SELECT
  user_id,
  FLOOR(RANDOM() * 5) AS platform_id
FROM users;