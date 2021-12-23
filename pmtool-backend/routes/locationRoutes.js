const express = require('express');
const router = express.Router();
const db = require('../lib/locationQueries')

const getZones = router.get("/locations", (req, res) => {

    db.getLocations()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getZones }