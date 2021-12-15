const { response } =require("express");
const db = require("./db");

const getSingleUser = (email, pass) => {

    console.log("keys are:", email, pass)
    return db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [email, pass])
    .then((response) => {
        console.log("user is:", response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getAllUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllUsers, getSingleUser }