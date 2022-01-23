--command to add tables (from inside db folder)
-- \i schema/01_schema.sql;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_projects CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS materials CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS taskNames CASCADE;
DROP TABLE IF EXISTS taskTypes CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE Not NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_projects (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(7,2) NOT NULL
);

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    quantity INTEGER NOT NULL,
    totalcost DECIMAL(12,2) NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY NOT NULL,
    seq INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    start DATE,
    "end" DATE,
    type VARCHAR(255) NOT NULL,
    progress INTEGER NOT NULL,
    dependencies TEXT [],
    barChildren TEXT [],
    hideChildren BOOLEAN DEFAULT FALSE Not NULL,
    project VARCHAR(255),
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL
);

CREATE TABLE taskNames (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE taskTypes (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);