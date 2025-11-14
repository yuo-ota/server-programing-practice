CREATE TABLE IF NOT EXISTS images (
	-- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL,
  index INT NOT NULL,
  path TEXT NOT NULL,
  alt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- ユニーク制約
  CONSTRAINT unique_images_post_index UNIQUE (post_id, index),

  -- 外部キー制約
	CONSTRAINT fk_images_post_id
		FOREIGN KEY (post_id)
		REFERENCES posts(id)
		ON DELETE RESTRICT
);

-- インデックスの作成
CREATE INDEX idx_images_post_id ON images(post_id);
CREATE INDEX idx_images_index ON images(index);