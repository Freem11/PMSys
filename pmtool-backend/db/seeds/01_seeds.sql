--command to add seeds (from inside db folder)
-- \i seeds/01_seeds.sql;

DELETE FROM users;
DELETE FROM projects;
DELETE FROM user_projects;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE user_projects_id_seq RESTART WITH 1;

INSERT INTO users(name, email, password)
VALUES ('Jerry', 'jerry@gmail.com', '$2b$10$79yCm1nJdNV6S8iAycSTnOlEaRCAjKa8EfxblOIdMjIFyrFXw56a.'),
('George', 'george@gmail.com', '$2b$10$wiDllG..ujvOY49IKDtLiOY.k8iTQTy2Hy.spK3Nay2aMs8XVtGtG');

INSERT INTO projects(name, status, user_id)
VALUES ('manhatten', 'Active', 1),
('long island', 'Active', 2),
('queens', 'Pending', 2),
('bronx', 'Pending', 1);