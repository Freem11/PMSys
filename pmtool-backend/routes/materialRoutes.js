const express = require('express');
const router = express.Router();
const db = require('../lib/materialQueries')

const getAllCivil = router.get("/materials/civil", (req, res) => {

    db.getCivil()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getAllFibre = router.get("/materials/fibre", (req, res) => {

    db.getFibre()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getAllCoax = router.get("/materials/coax", (req, res) => {

    db.getCoax()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getAllCivil, getAllFibre, getAllCoax }