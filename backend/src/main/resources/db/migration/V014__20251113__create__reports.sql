CREATE TABLE IF NOT EXISTS reports (
  -- 属性
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter UUID,
  is_report_user BOOLEAN NOT NULL,
  reportee UUID,
  reported_post_id UUID,
  category_status_id INTEGER[] NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE,

  -- 外部キー制約
  CONSTRAINT fk_reports_reporter
    FOREIGN KEY (reporter)
    REFERENCES users(user_id)
    ON DELETE SET NULL,

  CONSTRAINT fk_reports_reportee
    FOREIGN KEY (reportee)
    REFERENCES users(user_id)
    ON DELETE CASCADE,

  CONSTRAINT fk_reports_reported_post
    FOREIGN KEY (reported_post_id)
    REFERENCES posts(id)
    ON DELETE SET NULL,
  
  CONSTRAINT report_target_check
    CHECK (
      (is_report_user = TRUE  AND reportee IS NOT NULL AND reported_post_id IS NULL) OR
      (is_report_user = FALSE AND reported_post_id IS NOT NULL AND reportee IS NULL)
    )
);

-- インデックスの作成
CREATE INDEX idx_reports_reporter ON reports(reporter);
CREATE INDEX idx_reports_reportee ON reports(reportee);
CREATE INDEX idx_reports_reported_post ON reports(reported_post_id);