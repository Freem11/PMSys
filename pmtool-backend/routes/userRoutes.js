const express = require('express');
const router = express.Router();
const db = require('../lib/userQueries.js')
const bcrypt = require('bcrypt')


const getUser = router.post("/session", (req, res) => {

    db.getSingleUser(req.body.email)
    .then(user => {
        let check = bcrypt.compareSync(req.body.pass,user[0].password);
        if (check){
            res.json(user);
        } else {
            res.json(undefined);
        }
    })
    .catch(err => {
        res.json(undefined);
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

    const hashedPassword = bcrypt.hashSync(req.body.pass, 10)

    db.createUser(req.body.name, req.body.email, hashedPassword)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getUsers = router.get("/users", (req, res) => {

    db.getAllUsers()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});


const getUserName = router.post("/user", (req, res) => {

    db.getSingleUserByName(req.body.name)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getUser, addUser, getUserEmail, getUsers, getUserName}