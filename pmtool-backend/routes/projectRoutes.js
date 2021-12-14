const express = require('express');
const router = express.Router();
const db = require('../lib/projectQueries.js')

const getProjects = router.get("/projects", (req, res) => {

    db.getAllProjects()
    .then(projects => {
        console.log("projects", projects)
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getProject = router.get("/projects/:id", (req, res) => {

    db.getAllProjects()
    .then(projects => {
        console.log("project", projects)
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getProjects, getProject }