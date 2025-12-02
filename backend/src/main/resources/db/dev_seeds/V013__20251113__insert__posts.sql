INSERT INTO posts (creator_id, description, is_sensitive, is_published)
SELECT
  user_id AS creator_id,
  CONCAT('user', ROW_NUMBER() OVER (ORDER BY email_address)) AS description,
  FALSE AS is_sensitive,
  TRUE AS is_published
FROM users
LIMIT 3;

INSERT INTO images (post_id, index, path, alt)
SELECT
  p.id AS post_id,
  n.num AS index,
  CONCAT('path/to/image_', p.id, '_', n.num, '.jpg') AS path,
  CONCAT('Image ', p.id, '-', n.num) AS alt
FROM posts p
CROSS JOIN (
  SELECT 1 AS num
  UNION ALL SELECT 2
  UNION ALL SELECT 3
) n;