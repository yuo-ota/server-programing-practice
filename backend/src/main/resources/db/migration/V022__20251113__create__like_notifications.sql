CREATE TABLE IF NOT EXISTS like_notifications (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL,
  like_id UUID NOT NULL UNIQUE,

  -- 外部キー制約
  CONSTRAINT fk_like_notifications_notification_id
    FOREIGN KEY (notification_id)
    REFERENCES notifications(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_like_notifications_like_id
    FOREIGN KEY (like_id)
    REFERENCES likes(id)
    ON DELETE CASCADE
);

-- インデックスの作成
CREATE INDEX idx_like_notifications_notification_id ON like_notifications(notification_id);
CREATE INDEX idx_like_notifications_like_id ON like_notifications(like_id);