const express = require('express');
const router = express.Router();
const db = require('../lib/user_projectQueries')

const getTeam = router.get("/user_project/:id", (req, res) => {

    db.getProjectTeam(req.params.id)
    .then(project => {
        console.log('go 4 it', project)
        res.json(project);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getTeam }