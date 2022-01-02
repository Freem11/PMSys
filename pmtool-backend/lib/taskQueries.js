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

const updateTask = (name, type, start, end, progress, dependencies, barChildren, project, itemId) => {

  
    console.log('db gets', name, type, start, end, progress, dependencies, barChildren, project, itemId)
    return db.query(`UPDATE tasks SET name = $1, type = $2, start = $3, "end" = $4, progress = $5, dependencies = $6, barChildren = $7, project = $8 WHERE id= $9 RETURNING *;`, [name, type, start, end, progress, dependencies, barChildren, project, itemId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getTaskByName = (name, projectId) => {

    return db.query(`SELECT * FROM tasks WHERE name = $1 AND project_id = $2`,[name, projectId])
    .then((response) => {
        console.log("db prod",response.rows)
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getMaxTaskEnd = (projectName) => {

    // console.log("db gets", projectName)

    return db.query(`SELECT MAX("end") as "ender" FROM tasks WHERE project = $1 `,[projectName])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const get2MaxTaskEnd = (projectName) => {

    // console.log("db gets", projectName)

    return db.query(`SELECT MAX("end") as "ender" FROM tasks WHERE project = $1 AND "end" < (SELECT MAX("end") as "ender" FROM tasks WHERE project = $1)`,[projectName])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getMinTaskStart = (projectName) => {

    // console.log("db gets", projectName)

    return db.query(`SELECT MIN(start) as "starter" FROM tasks WHERE project = $1 `,[projectName])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const get2MinTaskStart = (projectName) => {

    // console.log("db gets", projectName)

    return db.query(`SELECT MIN(start) as "starter" FROM tasks WHERE project = $1 AND start > (SELECT MIN(start) as "starter" FROM tasks WHERE project = $1)`,[projectName])
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

module.exports = { getProjectTasks, updateTaskHider, updateTask, getTaskByName, getMinTaskStart, get2MinTaskStart, getMaxTaskEnd, get2MaxTaskEnd, addTask }