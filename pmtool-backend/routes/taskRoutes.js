const express = require("express");
const router = express.Router();
const db = require("../lib/taskQueries");

const getProjTasks = router.get("/tasks/:id", (req, res) => {
  let projId = req.params.id;

  db.getProjectTasks(projId)
    .then((taskList) => {
      tList = [...taskList];
      taskList.forEach((task) => {
        //if barchildren is true
        if (task.hidechildren) {
          //have barchildren
          task.barchildren.forEach((child) => {
            //for each barchild
            for (let i = 0; i < tList.length; i++) {
              //loop through data again

              if (tList[i].name === child && tList[i].project === task.name) {
                //if childname = data taskname and data taskproject = nameofproject
                tList.splice(i, 1);
              }
            }
          });
        }
      });
      res.json(tList);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const addProjTask = router.post("/task", (req, res) => {
  let name = req.body.name;
  let start = req.body.start;
  let end = req.body.end;
  let type = req.body.type;
  let progress = req.body.progress;
  let dependencies = req.body.dependencies;
  let barChildren = req.body.barChildren;
  let hideChildren = req.body.hideChildren;
  let projectId = req.body.projectId;

  db.addQuoteItem(
    name,
    start,
    end,
    type,
    progress,
    dependencies,
    barChildren,
    hideChildren,
    projectId
  )
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const updateHiddenTasks = router.post("/task/edit/hide/:id", (req, res) => {
  let swtch = req.body.swtch;
  let itemId = req.body.id;

  db.updateTaskHider(itemId, swtch)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const updateTaskRest = router.post("/task/edit/:id", (req, res) => {
  let name = req.body.name;
  let start = req.body.start;
  let end = req.body.end;
  let type = req.body.type;
  let progress = req.body.progress;
  let dependencies = req.body.dependencies;
  let barChildren = req.body.barChildren;
  let project = req.body.project;
  let itemId = req.body.id;

  db.updateTask(
    name,
    type,
    start,
    end,
    progress,
    dependencies,
    barChildren,
    project,
    itemId
  )
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const getSingleTask = router.post("/task/:id", (req, res) => {
  let projId = req.body.id;
  let name = req.body.name;

  console.log("route", req.body);

  db.getTaskByName(name, projId)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const getMinStart = router.post("/tasks/min", (req, res) => {
  let project = req.body.project;

  // console.log("route", req.body)

  db.getMinTaskStart(project)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const get2MinStart = router.post("/tasks/min2", (req, res) => {
  let project = req.body.project;

  // console.log("route", req.body)

  db.get2MinTaskStart(project)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const getMaxEnd = router.post("/tasks/max", (req, res) => {
  let project = req.body.project;

  // console.log("route", req.body)

  db.getMaxTaskEnd(project)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const get2MaxEnd = router.post("/tasks/max2", (req, res) => {
  let project = req.body.project;

  // console.log("route", req.body)

  db.get2MaxTaskEnd(project)
    .then((zones) => {
      res.json(zones);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
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

module.exports = {
  getProjTasks,
  updateHiddenTasks,
  updateTaskRest,
  getSingleTask,
  getMinStart,
  get2MinStart,
  getMaxEnd,
  get2MaxEnd,
  addProjTask,
};
