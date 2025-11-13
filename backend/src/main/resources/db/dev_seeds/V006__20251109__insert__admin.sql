WITH inserted_user AS (
  INSERT INTO users (email_address, password)
  VALUES ('user4@example.com', '$2y$04$xPlav/8V9C55rVHx9PCr6.iXxEH9Qy4HZDF2kkXF9xwVsixj82Ohi')
  RETURNING user_id
)
INSERT INTO admin_users (user_id)
SELECT user_id FROM inserted_user;