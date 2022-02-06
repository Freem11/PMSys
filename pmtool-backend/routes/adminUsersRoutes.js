const express = require('express');
const router = express.Router();
const db = require('../lib/adminUsersQueries')
const bcrypt = require('bcrypt')

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
    let admin = req.body.admin;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    db.addUser(name,email,hashedPassword,admin)
      .then((zones) => {
        res.json(zones);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }); 

  const updateUser = router.post("/admin/user/edit/:id", (req, res) => {

    let hashedPassword;

    if (req.body.password.length < 26){
        hashedPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        hashedPassword = req.body.password
    }
    
    db.updateUser(req.body.id,req.body.name, req.body.email, hashedPassword, req.body.admin)
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