const { response } =require("express");
const db = require("./db");

const getAllUsers = () => {
    return db.query('SELECT * FROM users')
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllUsers }