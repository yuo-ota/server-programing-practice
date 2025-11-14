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
JOIN likes ON TRUE
JOIN posts ON likes.post_id = posts.id
WHERE notifications.category_status_id = 0
  AND notifications.user_id = posts.creator_id
LIMIT 5;

INSERT INTO notifications (category_status_id, user_id)
SELECT
  1 AS category_status_id,
  users.user_id AS user_id
FROM users
LIMIT 5;

INSERT INTO penalty_notifications (notification_id, penalty_id)
SELECT
  notifications.id,
  p.id
FROM notifications
JOIN LATERAL (
  SELECT id FROM penalties
  WHERE penalties.penalized_user_id = notifications.user_id
  ORDER BY penalties.created_at
  LIMIT 1
) p ON true
WHERE notifications.category_status_id = 1
LIMIT 5;