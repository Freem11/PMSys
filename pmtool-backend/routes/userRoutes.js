const express = require('express');
const router = express.Router();
const db = require('../lib/userQueries.js')

const getUser = router.post("/users", (req, res) => {

    console.log("helloo", req.body)

    db.getSingleUser(req.body.email, req.body.pass)
    .then(user => {
        console.log("found user:", user)
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});



const getUsers = router.get("/users/:id", (req, res) => {

    db.getAllUsers()
    .then(users => {
        console.log("this stuff", users)
        res.json(users);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getUser }