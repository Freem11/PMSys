const express = require('express');
const router = express.Router();
const db = require('../lib/quoteQueries')

const getProjQuote = router.get("/quotes/:id", (req, res) => {

    let projId = req.params.id
    
    db.getProjectQuote(projId)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addProjQuote = router.post("/quote", (req, res) => {

    let itemname = req.body.name
    let cost = req.body.price
    let numb =req.body.quantity
    let Tc = req.body.totalcost
    let projId = req.body.projId

    db.addQuoteItem(itemname, cost, numb, Tc, projId)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const updateProjQuote = router.post("/quote/edit", (req, res) => {

    let numb =req.body.quantity
    let Tc = req.body.totalcost
    let itemId = req.body.itemId
    let projId = req.body.projId

    db.updateQuoteItem(numb, Tc, itemId, projId)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const delQuote = router.delete("/quote/delete/:id", (req, res) => {

    db.deleteQuoteItem(req.params.id)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

module.exports = { getProjQuote, addProjQuote, updateProjQuote, delQuote }