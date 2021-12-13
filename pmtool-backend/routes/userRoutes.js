const express = require('express');
const router = express.Router();

const getUsers = router.get("/users", (req, res) => {

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

const getUser = router.get("/users/:id", (req, res) => {

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

module.exports = { getUsers, getUser }