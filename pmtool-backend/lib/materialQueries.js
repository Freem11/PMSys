const { response } =require("express");
const db = require("./db");

const getCivil = () => {

    return db.query(`SELECT * FROM materials WHERE type = civil`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getFibre = () => {

    return db.query(`SELECT * FROM materials WHERE type = fibre`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getCoax = () => {

    return db.query(`SELECT * FROM materials WHERE type = coax`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getCivil, getFibre, getCoax }