const express = require('express');
const router = express.Router();
const db = require('../lib/taskQueries')

const getProjTasks = router.get("/tasks/:id", (req, res) => {

    let projId = req.params.id
    
    db.getProjectTasks(projId)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addProjTask = router.post("/task", (req, res) => {

    let name = req.body.name
    let start = req.body.start
    let end = req.body.end
    let type = req.body.type
    let progress =req.body.progress
    let dependencies = req.body.dependencies
    let barChildren = req.body.barChildren
    let hideChildren = req.body.hideChildren
    let projectId = req.body.projectId

    db.addQuoteItem(name, start, end, type, progress, dependencies, barChildren, hideChildren, projectId)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

// const updateProjQuote = router.post("/quote/edit", (req, res) => {

//     let numb =req.body.quantity
//     let Tc = req.body.totalcost
//     let itemId = req.body.id
//     let projId = req.body.projId

//     db.updateQuoteItem(numb, Tc, itemId, projId)
//     .then(zones => {
//         res.json(zones);
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .json({ error: err.message});
//     });
// });

// const delQuote = router.delete("/quote/delete/:id", (req, res) => {

//     db.deleteQuoteItem(req.params.id)
//     .then(projects => {
//         res.json(projects);
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .json({ error: err.message});
//     });
// });

// const getQuoteCosts = router.get("/quotes/total/:id", (req, res) => {

//     let projId = req.params.id

//     db.getQuoteTotalCost(projId)
//     .then(zones => {
//         res.json(zones);
//     })
//     .catch(err => {
//         res
//         .status(500)
//         .json({ error: err.message});
//     });
// });
module.exports = { getProjTasks, addProjTask }