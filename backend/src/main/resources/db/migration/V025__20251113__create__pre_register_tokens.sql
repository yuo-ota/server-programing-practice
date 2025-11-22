CREATE TABLE IF NOT EXISTS pre_register_tokens (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  duration INTERVAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- インデックスの作成
CREATE INDEX idx_pre_register_tokens_email_address ON pre_register_tokens(email_address);
CREATE INDEX idx_pre_register_tokens_token ON pre_register_tokens(token);