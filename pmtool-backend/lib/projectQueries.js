const { response } =require("express");
const db = require("./db");

const getUserProjects = (userId) => {
    return db.query('SELECT * FROM projects WHERE user_id= $1;', [userId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addProject = (name, status, userId) => {

    return db.query(`INSERT INTO projects (name, status, user_id)
    VALUES ($1, $2, $3) RETURNING *;`, [name, status, userId])
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

const updateProject = (name, user_id, projectId) => {

    return db.query(`UPDATE projects SET name = $1, user_id = $2 WHERE id= $3 RETURNING *;`, [name, user_id, projectId])
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
        console.log("db says", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getUserProjects, addProject, getProject, updateProject, deleteProject }