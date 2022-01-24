const { response } =require("express");
const db = require("./db");

const getAllMaterials = (text, location) => {

    modifiedText = "%" + text + "%"

    modifiedLocation = "%" + location + "%"

    console.log('db gets', modifiedText, modifiedLocation)

    return db.query(`SELECT * FROM materials WHERE name LIKE $1 AND location LIKE $2 LIMIT 10`,[modifiedText, modifiedLocation])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getAllMaterials }