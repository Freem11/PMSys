const { response } =require("express");
const db = require("./db");

const getAllUsers = (text, email) => {

    modifiedText = "%" + text + "%"

    modifiedEmail = "%" + email + "%"

    return db.query(`SELECT * FROM users WHERE name LIKE $1 AND email LIKE $2 LIMIT 10`,[modifiedText, modifiedEmail])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addUser = (name, email, password, admin,) => {
    // console.log("db gets",name,type,location,price )
    return db
      .query(
        `INSERT INTO users (name, email, password, admin)
      VALUES ($1, $2, $3, $4) RETURNING *;`,[name, email, password, admin]
      )
      .then((response) => {
        return response.rows;
      })
      .catch((error) => {
        console.log("unable to query db got error:", error);
      });
  };

  const updateUser = (id, name, email, password, admin) => {

    return db.query(`UPDATE users SET name = $1, email = $2, password = $3, admin = $4 WHERE id= $5 RETURNING *;`, [name, email, password, admin, id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteUser = (id) => {

    return db.query(`DELETE FROM users WHERE id= $1 RETURNING *;`, [id])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}
module.exports = { getAllUsers, addUser, updateUser, deleteUser }