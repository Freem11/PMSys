const express = require('express');
const router = express.Router();
const db = require('../lib/adminMaterialQueries')

const getTotalMaterials = router.post("/admin/materials", (req, res) => {

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

const addNewMaterial = router.post("/admin/material", (req, res) => {
    let name = req.body.name;
    let type = req.body.type;
    let location = req.body.location;
    let price = req.body.price;

    // console.log("route", req.body)
    db.addMaterial(name,type,location,price)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  
module.exports = { getTotalMaterials, addNewMaterial }