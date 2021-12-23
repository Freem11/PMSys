const { response } =require("express");
const db = require("./db");

const getLocations = () => {

    return db.query(`SELECT * FROM locations`)
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getLocations }