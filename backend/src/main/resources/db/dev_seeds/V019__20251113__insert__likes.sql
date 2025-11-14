INSERT INTO likes (user_id, post_id)
SELECT
  users.user_id AS user_id,
  posts.id AS post_id
FROM users
CROSS JOIN posts
WHERE users.user_id <> posts.creator_id
LIMIT 5;