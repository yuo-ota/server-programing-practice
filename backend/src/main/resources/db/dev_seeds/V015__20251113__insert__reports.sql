INSERT INTO reports (reporter, is_report_user, reportee, reported_post_id, category_status_id, details)
SELECT
  users.user_id AS reporter,
  TRUE AS is_report_user,
  reported_users.user_id AS reportee,
  NULL AS reported_post_id,
  FLOOR(RANDOM() * 7) AS category_status_id,
  CONCAT('Report details for user ', reported_users.user_id) AS details
FROM users AS users
CROSS JOIN users AS reported_users
WHERE users.user_id <> reported_users.user_id
LIMIT 5;

INSERT INTO reports (reporter, is_report_user, reportee, reported_post_id, category_status_id, details)
SELECT
  users.user_id AS reporter,
  FALSE AS is_report_user,
  NULL AS reportee,
  posts.id AS reported_post_id,
  FLOOR(RANDOM() * 7) AS category_status_id,
  CONCAT('Report details for post ', posts.id) AS details
FROM users
CROSS JOIN posts
LIMIT 5;