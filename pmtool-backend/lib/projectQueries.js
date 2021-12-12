const { response } =require("express");
const db = require("./db");

const getAllProjects = () => {
    return db.query('SELECT * FROM projects')
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllProjects }