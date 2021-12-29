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

const getAllCivil = router.get("/materials/civil/:id", (req, res) => {

    let location = req.params.id

    db.getCivil(location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getAllFibre = router.get("/materials/fibre/:id", (req, res) => {

    let location = req.params.id

    db.getFibre(location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getAllCoax = router.get("/materials/coax/:id", (req, res) => {

    let location = req.params.id

    db.getCoax(location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getAllCivil, getAllFibre, getAllCoax, getAllMaterials, getMaterialtypes }