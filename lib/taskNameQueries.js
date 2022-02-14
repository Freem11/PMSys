const { response } =require("express");
const db = require("./db");

const getAllTasksByType = (cat) => {

    return db.query(`SELECT * FROM taskNames WHERE type =$1`,[cat])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllTasksByType }