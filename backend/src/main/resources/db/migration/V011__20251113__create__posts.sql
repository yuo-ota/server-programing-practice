CREATE TABLE IF NOT EXISTS posts (
	-- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL,
  description TEXT,
  is_sensitive BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE,

  -- 外部キー制約
	CONSTRAINT fk_posts_creator_id
		FOREIGN KEY (creator_id)
		REFERENCES users(user_id)
		ON DELETE RESTRICT
);
