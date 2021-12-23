const { response } =require("express");
const db = require("./db");

const getUserProjects = (userId, text) => {

    modified = "%" + text + "%"

    return db.query(`SELECT * FROM projects WHERE name LIKE $1 AND user_id= $2 LIMIT 10;`, [modified, userId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addProject = (name, location, status, userId) => {

    return db.query(`INSERT INTO projects (name, location, status, user_id)
    VALUES ($1, $2, $3, $4) RETURNING *;`, [name, location, status, userId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getProject = (projectId) => {
    return db.query('SELECT * FROM projects WHERE id= $1;', [projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const updateProject = (name, location, user_id, projectId) => {

    return db.query(`UPDATE projects SET name = $1, location = $2, user_id = $3 WHERE id= $4 RETURNING *;`, [name, location, user_id, projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteProject = (projectId) => {

    return db.query(`DELETE FROM projects WHERE id= $1 RETURNING *;`, [projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getUserProjects, addProject, getProject, updateProject, deleteProject }