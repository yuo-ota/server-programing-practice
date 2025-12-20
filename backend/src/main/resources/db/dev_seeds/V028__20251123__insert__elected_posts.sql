INSERT INTO elected_posts (user_id, post_id, index, delivered_at)
SELECT
  users.user_id,
  posts.id,
  ROW_NUMBER() OVER (PARTITION BY users.user_id ORDER BY posts.id) - 1 AS index,
  NOW() - interval '1'  DAY
FROM users
CROSS JOIN posts
WHERE users.user_id <> posts.creator_id;
