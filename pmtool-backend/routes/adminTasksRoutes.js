const express = require('express');
const router = express.Router();
const db = require('../lib/adminTaskQueries')

const getTotalAdminTasks = router.post("/admin/tasks", (req, res) => {

    let text = req.body.text
    let type = req.body.type

    //  console.log("route", req.body)

    db.getAllAdminTasks(text,type)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addNewAdminTask = router.post("/admin/task", (req, res) => {
    let name = req.body.name;
    let type = req.body.type;

    // console.log("route", req.body)
    db.addAdminTask(name,type)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }); 

  const updateAdminTask = router.post("/admin/task/edit/:id", (req, res) => {

    db.updateAdminTask(req.body.id,req.body.name, req.body.type)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const delAdminTask = router.delete("/admin/task/delete/:id", (req, res) => {

    db.deleteAdminTask(req.params.id)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});
  
const getAllTasksCategories = router.get("/admin/taskcats", (req, res) => {

    db.getTaskTypes()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const getAllTaskCategories = router.get("/admin/categories", (req, res) => {

    db.getTaskCategories()
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addNewTaskCategory = router.post("/admin/taskcat", (req, res) => {
    let name = req.body.name;

    console.log("route", name)

    db.addTaskCat(name)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }); 

  const delTaskCategory = router.delete("/admin/taskcat/delete/:id", (req, res) => {

    db.deleteTaskCat(req.params.id)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});
module.exports = { getTotalAdminTasks, addNewAdminTask, updateAdminTask, delAdminTask, getAllTasksCategories, getAllTaskCategories, addNewTaskCategory, delTaskCategory}
