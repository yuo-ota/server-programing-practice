CREATE TABLE IF NOT EXISTS social_accounts (
	-- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  platform_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	-- 外部キー制約: users(user_id) を参照
	CONSTRAINT fk_social_accounts_user_id
		FOREIGN KEY (user_id)
		REFERENCES users(user_id)
		ON DELETE RESTRICT
);
