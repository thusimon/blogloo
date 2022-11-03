CREATE TABLE if NOT EXISTS ip_count (
  id int NOT NULL PRIMARY KEY,
  ip varchar(255),
  visit_count smallint,
  visit_time datetime(6)
);
