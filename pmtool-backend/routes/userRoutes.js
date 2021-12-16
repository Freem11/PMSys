const express = require('express');
const router = express.Router();
const db = require('../lib/userQueries.js')

const getUser = router.post("/session", (req, res) => {

    db.getSingleUser(req.body.email, req.body.pass)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getUserEmail = router.post("/sessions", (req, res) => {

    db.getSingleUserByEmail(req.body.email)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addUser = router.post("/register", (req, res) => {

    db.createUser(req.body.email, req.body.pass)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getUser, addUser, getUserEmail }