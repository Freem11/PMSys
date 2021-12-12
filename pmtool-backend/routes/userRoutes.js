const express = require('express');
const router = express.Router();
const db = require('../lib/userQueries.js')

router.get("/", (req, res) => {
    db.getAllUsers()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = router