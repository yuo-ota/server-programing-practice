INSERT INTO notifications (category_status_id, user_id)
SELECT
  0 AS category_status_id,
  users.user_id AS user_id
FROM users
LIMIT 5;

INSERT INTO like_notifications (notification_id, like_id)
SELECT
  notifications.id AS notification_id,
  likes.id AS like_id
FROM notifications
CROSS JOIN likes
WHERE notifications.category_status_id = 0
  AND notifications.user_id = likes.user_id
LIMIT 5;

INSERT INTO notifications (category_status_id, user_id)
SELECT
  1 AS category_status_id,
  users.user_id AS user_id
FROM users
LIMIT 5;

INSERT INTO penalty_notifications (notification_id, penalty_id)
SELECT
  notifications.id AS notification_id,
  penalties.id AS penalty_id
FROM notifications
CROSS JOIN penalties
WHERE notifications.category_status_id = 1
  AND notifications.user_id = penalties.penalized_user_id
LIMIT 5;