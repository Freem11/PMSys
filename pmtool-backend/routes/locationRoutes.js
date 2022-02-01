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


const addNewLocation = router.post("/admin/location", (req, res) => {
    let name = req.body.name;

    console.log("route", name)

    db.addLocation(name)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }); 

  const delLocation = router.delete("/admin/location/delete/:id", (req, res) => {

    db.deleteLocation(req.params.id)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getZones, addNewLocation, delLocation }