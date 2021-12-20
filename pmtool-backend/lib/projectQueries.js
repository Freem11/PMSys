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

module.exports = { getUserProjects, addProject }