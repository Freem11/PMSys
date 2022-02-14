const { response } =require("express");
const db = require("./db");

const getUsers = () => {

    return db.query(`SELECT * FROM users;`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getSingleUser = (email) => {
    console.log("DB gets", email)

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

const getAllUsers = () => {

    return db.query(`SELECT * FROM users`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getSingleUserByName = (name) => {

    return db.query(`SELECT * FROM users WHERE name = $1;`, [name])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getSingleUserById = (id) => {

    return db.query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getUsers, createUser, getSingleUser, getSingleUserByEmail, getAllUsers, getSingleUserByName, getSingleUserById}