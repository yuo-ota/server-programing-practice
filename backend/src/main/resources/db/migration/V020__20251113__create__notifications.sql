CREATE TABLE IF NOT EXISTS notifications (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_status_id INT NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- 外部キー制約
  CONSTRAINT fk_notifications_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE RESTRICT
);

-- インデックスの作成
CREATE INDEX idx_notifications_user_id ON notifications(user_id);