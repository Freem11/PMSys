const { response } =require("express");
const db = require("./db");

const getProjectQuote = (projectId) => {

    return db.query(`SELECT * FROM quotes WHERE project_id = $1`,[projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const addQuoteItem = (name, price, quantity, totalcost, projectId) => {

    return db.query(`INSERT INTO quotes (name, price, quantity, totalcost, project_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [name, price, quantity, totalcost, projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const updateQuoteItem = (quantity, totalcost, itemId, projectId) => {

    return db.query(`UPDATE quotes SET quantity = $1, totalcost = $2 WHERE id= $3 AND project_id =$4 RETURNING *;`, [quantity, totalcost, itemId, projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const deleteQuoteItem = (itemId) => {

    return db.query(`DELETE FROM quotes WHERE id= $1 RETURNING *;`, [itemId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

const getQuoteTotalCost = (projectId) => {

    return db.query(`SELECT SUM(totalcost) FROM quotes WHERE project_id = $1`,[projectId])
    .then((response) => {
        return response.rows;
    })
    .catch((error) => {
        console.log("unable to query db got error:", error);
    })
}

module.exports = { getProjectQuote, addQuoteItem, updateQuoteItem, deleteQuoteItem, getQuoteTotalCost }