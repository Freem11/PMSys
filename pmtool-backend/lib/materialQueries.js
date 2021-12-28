const { response } =require("express");
const db = require("./db");

const getCivil = (location) => {

    return db.query(`SELECT * FROM materials WHERE type = 'Civil' AND location =$1`,[location])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getFibre = (location) => {

    return db.query(`SELECT * FROM materials WHERE type = 'Fibre' AND location =$1`,[location])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getCoax = (location) => {

    return db.query(`SELECT * FROM materials WHERE type = 'Coax' AND location =$1`,[location])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getCivil, getFibre, getCoax }