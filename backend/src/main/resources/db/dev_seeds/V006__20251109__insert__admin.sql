INSERT INTO admin_users (user_id)
  SELECT
    users.user_id AS user_id
  FROM users
LIMIT 2;