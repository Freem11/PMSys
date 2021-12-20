const { response } =require("express");
const db = require("./db");

const addTeam = (userId, projectId) => {

    return db.query(`INSERT INTO user_projects (user_id, project_id)
    VALUES ($1, $2) RETURNING *;`, [userId, projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { addTeam }