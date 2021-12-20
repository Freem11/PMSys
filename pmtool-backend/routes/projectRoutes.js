const express = require('express');
const router = express.Router();
const db = require('../lib/projectQueries.js')
const dbd = require('../lib/user_projectQueries')

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

const createProject = router.post("/project", (req, res) => {

    db.addProject(req.body.name, req.body.status, req.body.userId)
    .then(project => {
        res.json(project);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const createUserProject = router.post("/user_project", (req, res) => {

    dbd.addTeam(req.body.userId, req.body.projectId)
    .then(project => {
        res.json(project);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getProjects, createProject, createUserProject }