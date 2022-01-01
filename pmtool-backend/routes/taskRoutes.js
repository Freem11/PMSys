const express = require('express');
const router = express.Router();
const db = require('../lib/taskQueries')

const getProjTasks = router.get("/tasks/:id", (req, res) => {

    let projId = req.params.id
 

    db.getProjectTasks(projId)
    .then(taskList => {
            tList = [...taskList]
        taskList.forEach(task => {

                //if barchildren is true
            if (task.hidechildren) {
                //have barchildren

            task.barchildren.forEach(child => {
                //for each barchild

               for( let i = 0; i < tList.length; i++){ 
                   //loop through data again
    
                    if ( tList[i].name === child && tList[i].project === task.name) { 
                        //if childname = data taskname and data taskproject = nameofproject
                        tList.splice(i, 1); 
                    }
                }
            })
            }
        });

        console.log('hope this works', tList)
        res.json(tList);
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

const updateHiddenTasks = router.post("/task/edit/:id", (req, res) => {

    console.log("route", req.body)
    let swtch = req.body.swtch
    let itemId = req.body.id


    db.updateTaskHider(itemId, swtch)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

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
module.exports = { getProjTasks, updateHiddenTasks, addProjTask }