const express = require('express');
const router = express.Router();
const db = require('../lib/projectQueries.js')

const getProjects = router.post("/projects", (req, res) => {

    db.getUserProjects(req.body.userId)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getProjects }