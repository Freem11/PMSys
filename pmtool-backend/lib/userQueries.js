const { response } =require("express");
const db = require("./db");

const getSingleUser = (email, pass) => {

    return db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [email, pass])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getSingleUserByEmail = (email) => {

    return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}


const createUser = (email, password) => {
    return db.query(`INSERT INTO users (email, password)
    VALUES ($1, $2) RETURNING *;`, [email, password])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { createUser, getSingleUser, getSingleUserByEmail }