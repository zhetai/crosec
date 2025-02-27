-- 用户表
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  created_at INTEGER
);

-- 地址表
CREATE TABLE addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  country TEXT,
  province TEXT,
  city TEXT,
  street TEXT
); 