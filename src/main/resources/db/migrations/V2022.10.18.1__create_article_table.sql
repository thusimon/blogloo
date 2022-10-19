CREATE TABLE if NOT EXISTS article (
  id varchar(255) NOT NULL PRIMARY KEY,
  article_list_id varchar(255),
  author varchar(255),
  content text,
  create_at datetime(6),
  locale varchar(255),
  title varchar(255)
);
