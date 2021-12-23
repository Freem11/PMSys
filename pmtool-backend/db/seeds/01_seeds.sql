--command to add seeds (from inside db folder)
-- \i seeds/01_seeds.sql;

DELETE FROM users;
DELETE FROM projects;
DELETE FROM user_projects;
DELETE FROM locations;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE user_projects_id_seq RESTART WITH 1;
ALTER SEQUENCE locations_id_seq RESTART WITH 1;

INSERT INTO users(name, email, password)
VALUES ('Jerry', 'jerry@gmail.com', '$2b$10$79yCm1nJdNV6S8iAycSTnOlEaRCAjKa8EfxblOIdMjIFyrFXw56a.'),
('George', 'george@gmail.com', '$2b$10$wiDllG..ujvOY49IKDtLiOY.k8iTQTy2Hy.spK3Nay2aMs8XVtGtG');

INSERT INTO projects(name, location, status, user_id)
VALUES ('manhatten', 'Vancouver', 'Active', 1),
('long island', 'Victoria', 'Active', 2),
('queens', 'Calgary', 'Pending', 2),
('bronx', 'Edmonton', 'Pending', 1);

INSERT INTO locations(name)
VALUES ('Calgary'), ('Edmonton'), ('Regina'), ('Vancouver'), ('Victoria');
