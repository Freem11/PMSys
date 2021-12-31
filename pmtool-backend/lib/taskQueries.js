const { response } =require("express");
const db = require("./db");

const getProjectTasks = (projectId) => {

    return db.query(`SELECT * FROM tasks WHERE project_id = $1`,[projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addTask = (name, start, end, type, progress, dependencies, barChildren, hideChildren, projectId) => {

    return db.query(`INSERT INTO tasks (name, type, progress, dependencies, barChildren, hideChildren, project_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [name, start, end, type, progress, dependencies, barChildren, hideChildren, projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

// const updateQuoteItem = (quantity, totalcost, itemId, projectId) => {

//     return db.query(`UPDATE quotes SET quantity = $1, totalcost = $2 WHERE id= $3 AND project_id =$4 RETURNING *;`, [quantity, totalcost, itemId, projectId])
//     .then((response) => {
//         return response.rows;
//     })
//     .catch((error) => {
//         console.log("unable to query db got error:", error);
//     })
// }

// const deleteQuoteItem = (itemId) => {

//     return db.query(`DELETE FROM quotes WHERE id= $1 RETURNING *;`, [itemId])
//     .then((response) => {
//         return response.rows;
//     })
//     .catch((error) => {
//         console.log("unable to query db got error:", error);
//     })
// }

// const getQuoteTotalCost = (projectId) => {

//     return db.query(`SELECT SUM(totalcost) FROM quotes WHERE project_id = $1`,[projectId])
//     .then((response) => {
//         return response.rows;
//     })
//     .catch((error) => {
//         console.log("unable to query db got error:", error);
//     })
// }

module.exports = { getProjectTasks, addTask }