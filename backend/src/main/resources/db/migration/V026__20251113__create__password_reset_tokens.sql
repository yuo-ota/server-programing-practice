CREATE TABLE IF NOT EXISTS password_reset_tokens (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token VARCHAR(64) NOT NULL,
  duration INTERVAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- 外部キー制約
  CONSTRAINT fk_password_reset_tokens_user
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)
  ON DELETE CASCADE
);

-- インデックスの作成
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);