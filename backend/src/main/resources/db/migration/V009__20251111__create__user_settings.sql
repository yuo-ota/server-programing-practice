CREATE TABLE IF NOT EXISTS user_settings (
	-- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  display_id VARCHAR(15) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon_path TEXT NOT NULL DEFAULT '/images/icons/default.png',
  header_path TEXT NOT NULL DEFAULT '/images/headers/default.png',
  introduction TEXT,
  birthday DATE,
  show_adult_content BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	-- 外部キー制約: users(user_id) を参照
	CONSTRAINT fk_user_settings_user_id
		FOREIGN KEY (user_id)
		REFERENCES users(user_id)
		ON DELETE CASCADE
);

-- トリガーの作成
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
