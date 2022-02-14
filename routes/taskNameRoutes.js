const express = require('express');
const router = express.Router();
const db = require('../lib/taskNameQueries')

const getAllTasksOfType = router.get("/taskNames/:id", (req, res) => {

    let category = req.params.id

    db.getAllTasksByType(category)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getAllTasksOfType }