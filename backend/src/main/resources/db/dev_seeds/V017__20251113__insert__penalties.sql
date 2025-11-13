INSERT INTO penalties (penalty_status_id, penalized_user_id, admin_user_id, duration_value, duration_unit, reason)
SELECT
  FLOOR(RANDOM() * 3) AS penalty_status_id,
  users.user_id AS penalized_user_id,
  admin_users.user_id AS admin_user_id,
  FLOOR(RANDOM() * 10) AS duration_value,
  'days' AS duration_unit,
  CONCAT('Penalty reason for user ', users.user_id) AS reason
FROM users
CROSS JOIN admin_users
LIMIT 5;