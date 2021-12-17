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

module.exports = { getUserProjects }