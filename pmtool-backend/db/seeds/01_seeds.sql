--command to add seeds (from inside db folder)
-- \i seeds/01_seeds.sql;

DELETE FROM users;
DELETE FROM projects;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;

INSERT INTO users(name, email, password)
VALUES ('Jerry', 'jerry@gmail.com', '$2b$10$79yCm1nJdNV6S8iAycSTnOlEaRCAjKa8EfxblOIdMjIFyrFXw56a.'),
('George', 'george@gmail.com', '$2b$10$wiDllG..ujvOY49IKDtLiOY.k8iTQTy2Hy.spK3Nay2aMs8XVtGtG');

INSERT INTO projects(name, status, user_id)
VALUES ('manhatten', 'active', 1),
('long island', 'active', 2),
('queens', 'inactive', 2),
('bronx', 'inactive', 1);