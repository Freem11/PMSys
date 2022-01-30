const { response } =require("express");
const db = require("./db");

const getAllAdminTasks = (text, type) => {

    modifiedText = "%" + text + "%"

    modifiedType = "%" + type + "%"

    return db.query(`SELECT * FROM taskNames WHERE name LIKE $1 AND type LIKE $2 LIMIT 10`,[modifiedText, modifiedType])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addAdminTask = (name, type) => {
    // console.log("db gets",name,type )
    return db
      .query(
        `INSERT INTO taskNames (name, type)
      VALUES ($1, $2) RETURNING *;`,[name,type]
      )
      .then((response) => {
        return response.rows;
      })
      .catch((error) => {
        console.log("unable to query db got error:", error);
      });
  };

  const updateAdminTask = (id, name, type) => {

    return db.query(`UPDATE taskNames SET name = $1, type = $2 WHERE id= $3 RETURNING *;`, [name, type, id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteAdminTask = (id) => {

    return db.query(`DELETE FROM taskNames WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getTaskTypes = () => {
    console.log("ping db")

    return db.query('SELECT DISTINCT type FROM taskNames')
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
  }

module.exports = { getAllAdminTasks, addAdminTask, updateAdminTask, deleteAdminTask, getTaskTypes }