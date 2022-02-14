const { response } =require("express");
const db = require("./db");

const getMaterials = (location) => {

    return db.query(`SELECT * FROM materials WHERE location =$1`,[location])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getMaterialTypes = (location) => {

    return db.query(`SELECT DISTINCT type FROM materials WHERE location =$1`,[location])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getMaterials, getMaterialTypes }