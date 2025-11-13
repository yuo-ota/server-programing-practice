CREATE TABLE IF NOT EXISTS elected_posts (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  index INT NOT NULL,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- 外部キー制約
  CONSTRAINT fk_elected_posts_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE RESTRICT,

  CONSTRAINT fk_elected_posts_post_id
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE RESTRICT
);

-- インデックスの作成
CREATE INDEX idx_elected_posts_user_id ON elected_posts(user_id);
CREATE INDEX idx_elected_posts_post_id ON elected_posts(post_id);
CREATE INDEX idx_elected_posts_delivered_at ON elected_posts(delivered_at);