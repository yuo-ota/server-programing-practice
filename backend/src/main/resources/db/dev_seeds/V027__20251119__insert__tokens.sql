INSERT INTO pre_register_tokens (email_address, token, duration) VALUES
('user5@example.com', 'dc5a4d3d82f7e15792959dc661538ae0e541ce66494516f5c9cfd9cd3308494d', '15min');

INSERT INTO password_reset_tokens (user_id, token, duration)
SELECT
  user_id,
  '267239f4fcaa6caf00fe6025966aca7caf751596855414b5ae4b4bca6e0588d5',
  '15min'
FROM users
LIMIT 1;
