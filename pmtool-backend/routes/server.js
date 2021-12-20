const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
  const bodyParser = require("body-parser")
  const { getUser, addUser, getUserEmail, getUsers, getUserName } = require('./userRoutes')
  const { getProjects, createProject, createUserProject, getSingleProject, updateProject } = require('./projectRoutes')

app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(getUser)
app.use(addUser)
app.use(getUserEmail)
app.use(getUsers)
app.use(getUserName)

app.use(getProjects)
app.use(createProject)
app.use(createUserProject)
app.use(getSingleProject)
app.use(updateProject)