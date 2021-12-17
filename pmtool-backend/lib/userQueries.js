const { response } =require("express");
const db = require("./db");

const getSingleUser = (email) => {

    return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
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


const createUser = (name, email, password) => {
    return db.query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;`, [name, email, password])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { createUser, getSingleUser, getSingleUserByEmail }