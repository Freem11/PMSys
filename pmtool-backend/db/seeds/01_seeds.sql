--command to add seeds (from inside db folder)
-- \i seeds/01_seeds.sql;

DELETE FROM users;
DELETE FROM projects;
DELETE FROM user_projects;
DELETE FROM locations;
DELETE FROM materials;
DELETE FROM quotes;
DELETE FROM tasks;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE projects_id_seq RESTART WITH 1;
ALTER SEQUENCE user_projects_id_seq RESTART WITH 1;
ALTER SEQUENCE locations_id_seq RESTART WITH 1;
ALTER SEQUENCE materials_id_seq RESTART WITH 1;
ALTER SEQUENCE quotes_id_seq RESTART WITH 1;
ALTER SEQUENCE tasks_id_seq RESTART WITH 1;

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

INSERT INTO materials(name, type, location, price)
VALUES ('S-4000 Node', 'Fibre', 'Vancouver', 1000.00),
('QR 540 Coaxial', 'Coax', 'Vancouver', 12.99),
('QR 540 Coaxial', 'Coax', 'Calgary', 11.96),
('QR 540 Coaxial', 'Coax', 'Victoria', 10.64),
('1.5 Service Vault', 'Civil', 'Calgary', 564.50),
('1.2 Service Vault', 'Civil', 'Vancouver', 446.81),
('2inch Conduit', 'Civil', 'Vancouver', 32.65),
('4inch Conduit', 'Civil', 'Vancouver', 64.24),
('QR 860 Coaxial', 'Coax', 'Vancouver', 22.45),
('S-4000 Node', 'Fibre', 'Calgary', 1000.00);


INSERT INTO tasks(name, start, "end", type, progress, dependencies, barchildren, hidechildren, project, project_id)
VALUES ('Build', '2022-1-3', '2022-1-16', 'project', 75, '{}', '{City Permit, Civil Build}', false, '', 1),
('City Permit', '2022-1-3', '2022-1-10', 'task', 100, '{}', '{}', false, 'Build', 1),
('Civil Build', '2022-1-11', '2022-1-16', 'task', 50, '{City Permit}', '{}', false, 'Build', 1),
('Plant', '2022-2-3', '2022-2-17', 'project', 0, '{Build}', '{Fibre Build, Place Fibre}', true, '', 1),
('Fibre Build', '2022-2-3', '2022-2-10', 'task', 0, '{}', '{}', false, 'Plant', 1),
('Place Fibre', '2022-2-11', '2022-2-17', 'task', 0, '{Fibre Build}', '{}', false, 'Plant', 1);