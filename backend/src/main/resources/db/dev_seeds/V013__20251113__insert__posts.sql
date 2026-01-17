INSERT INTO posts (creator_id, description, is_sensitive, is_published, created_at)
SELECT
  user_id AS creator_id,
  CONCAT('user', ROW_NUMBER() OVER (ORDER BY email_address)) AS description,
  FALSE AS is_sensitive,
  TRUE AS is_published,
  CURRENT_TIMESTAMP - INTERVAL '1 day' AS created_at
FROM users
LIMIT 25;

INSERT INTO images (post_id, index, path, alt)
VALUES
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 0), 1, '/images/works/works1.png', 'Work 1'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 1), 1, '/images/works/works2.png', 'Work 2'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 2), 1, '/images/works/works3.jpg', 'Work 3'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 3), 1, '/images/works/works4.png', 'Work 4'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 4), 1, '/images/works/works5.png', 'Work 5'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 5), 1, '/images/works/works6.png', 'Work 6'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 6), 1, '/images/works/works7.png', 'Work 7'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 7), 1, '/images/works/works8.png', 'Work 8'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 8), 1, '/images/works/works9.png', 'Work 9'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 9), 1, '/images/works/works10.png', 'Work 10'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 10), 1, '/images/works/works11.png', 'Work 11'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 11), 1, '/images/works/works12.png', 'Work 12'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 12), 1, '/images/works/works13.png', 'Work 13'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 13), 1, '/images/works/works14.png', 'Work 14'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 14), 1, '/images/works/works15.png', 'Work 15'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 15), 1, '/images/works/works16.png', 'Work 16'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 16), 1, '/images/works/works17.png', 'Work 17'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 17), 1, '/images/works/works18.png', 'Work 18'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 18), 1, '/images/works/works19.png', 'Work 19'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 19), 1, '/images/works/works20.png', 'Work 20'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 20), 1, '/images/works/works5.png', 'Work 21'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 21), 1, '/images/works/works6.png', 'Work 22'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 22), 1, '/images/works/works7.png', 'Work 23'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 23), 1, '/images/works/works8.png', 'Work 24'),
  ((SELECT id FROM posts ORDER BY id LIMIT 1 OFFSET 24), 1, '/images/works/works9.png', 'Work 25');