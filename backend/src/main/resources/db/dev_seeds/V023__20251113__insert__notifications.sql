INSERT INTO notifications (category_status_id, user_id)
SELECT DISTINCT
  0 AS category_status_id,           -- LIKE
  posts.creator_id AS user_id        -- 通知を受け取る人
FROM likes
JOIN posts ON likes.post_id = posts.id
LEFT JOIN like_notifications ln ON ln.like_id = likes.id
WHERE ln.like_id IS NULL
LIMIT 10;

INSERT INTO like_notifications (notification_id, like_id)
SELECT
  n.id AS notification_id,
  l.id AS like_id
FROM notifications n
JOIN posts p ON p.creator_id = n.user_id
JOIN likes l ON l.post_id = p.id
LEFT JOIN like_notifications ln ON ln.like_id = l.id
WHERE n.category_status_id = 0
  AND ln.like_id IS NULL;

INSERT INTO notifications (category_status_id, user_id)
SELECT DISTINCT
  1 AS category_status_id,        -- PENALTY
  penalties.penalized_user_id
FROM penalties
LEFT JOIN penalty_notifications pn ON pn.penalty_id = penalties.id
WHERE pn.penalty_id IS NULL
LIMIT 10;

INSERT INTO penalty_notifications (notification_id, penalty_id)
SELECT
  n.id AS notification_id,
  p.id AS penalty_id
FROM notifications n
JOIN penalties p ON p.penalized_user_id = n.user_id
LEFT JOIN penalty_notifications pn ON pn.penalty_id = p.id
WHERE n.category_status_id = 1
  AND pn.penalty_id IS NULL;