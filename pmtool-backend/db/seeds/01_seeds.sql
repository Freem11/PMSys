--command to add seeds (from inside db folder)
-- \i seeds/01_seeds.sql;

DELETE FROM users;
DELETE FROM projects;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;

INSERT INTO users(email, password)
VALUES ('jerry@gmail.com', 'jerry'),
('george@gmail.com', 'george');

INSERT INTO projects(name, status, user_id)
VALUES ('manhatten', 'active', 1),
('long island', 'active', 2),
('queens', 'inactive', 2),
('bronx', 'inactive', 1);