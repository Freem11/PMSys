const express = require('express');
const router = express.Router();
const db = require('../lib/materialQueries')

const getAllMaterials = router.get("/materials/:id", (req, res) => {

    let location = req.params.id

    db.getMaterials(location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getMaterialtypes = router.get("/materials/types/:id", (req, res) => {

    let location = req.params.id

    db.getMaterialTypes(location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getAllMaterials, getMaterialtypes }