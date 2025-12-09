INSERT INTO admin_users (user_id)
  SELECT
    users.user_id AS user_id
  FROM users
  WHERE users.email_address NOT IN (
    'user@example.com',
    'admin@example.com'
  )
LIMIT 2;

INSERT INTO admin_users (user_id)
  SELECT
    users.user_id AS user_id
  FROM users
  WHERE users.email_address = 'admin@example.com';