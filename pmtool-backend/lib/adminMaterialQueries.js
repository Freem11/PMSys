const { response } =require("express");
const db = require("./db");

const getAllMaterials = (text, location) => {

    modifiedText = "%" + text + "%"

    modifiedLocation = "%" + location + "%"

    return db.query(`SELECT * FROM materials WHERE name LIKE $1 AND location LIKE $2 LIMIT 10`,[modifiedText, modifiedLocation])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addMaterial = (name, type, location, price,) => {
    // console.log("db gets",name,type,location,price )
    return db
      .query(
        `INSERT INTO materials (name, type, location, price)
      VALUES ($1, $2, $3, $4) RETURNING *;`,[name,type,location,price]
      )
      .then((response) => {
        return response.rows;
      })
      .catch((error) => {
        console.log("unable to query db got error:", error);
      });
  };

  const updateMaterial = (id, name, type, location, price) => {

    return db.query(`UPDATE materials SET name = $1, type = $2, location= $3, price= $4 WHERE id= $5 RETURNING *;`, [name, type, location, price, id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteMaterial = (id) => {

    return db.query(`DELETE FROM materials WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { getAllMaterials, addMaterial, updateMaterial, deleteMaterial }