const express = require('express');
const router = express.Router();
const db = require('../lib/adminUsersQueries')

const getTotalUsers = router.post("/admin/users", (req, res) => {

    let text = req.body.text
    let email = req.body.email

    db.getAllUsers(text,email)
    .then(zones => {
        res.json(zones);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const addNewUser = router.post("/admin/user", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let admin = req.body.admin;

    // console.log("route", req.body)
    db.addUser(name,email,password,admin)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }); 

  const updateUser = router.post("/admin/user/edit/:id", (req, res) => {

    db.updateUser(req.body.id,req.body.name, req.body.email, req.body.password, req.body.admin)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});

const delUser = router.delete("/admin/user/delete/:id", (req, res) => {

    db.deleteUser(req.params.id)
    .then(projects => {
        res.json(projects);
    })
    .catch(err => {
        res
        .status(500)
        .json({ error: err.message});
    });
});
  
module.exports = { getTotalUsers, addNewUser, updateUser, delUser }