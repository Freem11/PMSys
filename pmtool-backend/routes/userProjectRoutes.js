const express = require('express');
const router = express.Router();
const db = require('../lib/user_projectQueries')
const dbd = require('../lib/userQueries')


const getTeam = router.get("/user_project/:id", (req, res) => {

    db.getProjectTeam(req.params.id)
    .then(project => {
  
        dbd.getUsers()
        .then(users => {
                let names = []
                project.forEach((userProject) => {
                    users.forEach((user) => {
                    if (userProject.user_id === user.id){
                        names.push(user)
                    }
                })      
        })
        res.json(names);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    })
}) 
.catch(err => {
    res
    .status(500)
    .json({ error: err.message});
});
});

module.exports = { getTeam }