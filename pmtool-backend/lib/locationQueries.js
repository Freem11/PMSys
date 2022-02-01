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

const addLocation = (name) => {

    return db
      .query(
        `INSERT INTO locations (name)
      VALUES ($1) RETURNING *;`,[name]
      )
      .then((response) => {
        return response.rows;
      })
      .catch((error) => {
        console.log("unable to query db got error:", error);
      });
  };

  const deleteLocation = (id) => {

    return db.query(`DELETE FROM locations WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getLocations, addLocation, deleteLocation }