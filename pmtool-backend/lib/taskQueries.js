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

const updateTaskHider = (itemId, hide) => {

    return db.query(`UPDATE tasks SET hideChildren = $1 WHERE id= $2 RETURNING *;`, [hide, itemId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

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

module.exports = { getProjectTasks, updateTaskHider, addTask }