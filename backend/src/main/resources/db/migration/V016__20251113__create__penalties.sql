CREATE TABLE IF NOT EXISTS penalties (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  penalty_status_id INT NOT NULL,
  penalized_user_id UUID NOT NULL,
  admin_user_id UUID,
  duration_value INT,
  duration_unit TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	-- バリデーション制約
	CONSTRAINT duration_unit_format CHECK (duration_unit ~* '^(days|weeks|months|years|unlimited)$'),

  -- 外部キー制約
  CONSTRAINT fk_penalties_penalized_user_id
    FOREIGN KEY (penalized_user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_penalties_admin_user_id
    FOREIGN KEY (admin_user_id)
    REFERENCES admin_users(user_id)
    ON DELETE SET NULL
);

-- インデックスの作成
CREATE INDEX idx_penalties_penalized_user_id ON penalties(penalized_user_id);
CREATE INDEX idx_penalties_admin_user_id ON penalties(admin_user_id);