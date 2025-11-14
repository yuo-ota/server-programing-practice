CREATE TABLE IF NOT EXISTS penalty_notifications (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id UUID NOT NULL UNIQUE,
  penalty_id UUID NOT NULL UNIQUE,

  -- 外部キー制約
  CONSTRAINT fk_penalty_notifications_notification_id
    FOREIGN KEY (notification_id)
    REFERENCES notifications(id)
    ON DELETE RESTRICT,

  CONSTRAINT fk_penalty_notifications_penalty_id
    FOREIGN KEY (penalty_id)
    REFERENCES penalties(id)
    ON DELETE RESTRICT
);

-- インデックスの作成
CREATE INDEX idx_penalty_notifications_notification_id ON penalty_notifications(notification_id);
CREATE INDEX idx_penalty_notifications_penalty_id ON penalty_notifications(penalty_id);