CREATE TABLE IF NOT EXISTS likes (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  post_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  -- 外部キー制約
  CONSTRAINT fk_likes_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_likes_post_id
    FOREIGN KEY (post_id)
    REFERENCES posts(id)
    ON DELETE SET NULL
);

-- インデックスの作成
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);