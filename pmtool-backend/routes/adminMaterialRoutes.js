const express = require('express');
const router = express.Router();
const db = require('../lib/adminMaterialQueries')

const getTotalMaterials = router.post("/admin/materials", (req, res) => {

    console.log("route gets", req.body)
    let text = req.body.text
    let location = req.body.location

    db.getAllMaterials(text,location)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getTotalMaterials }