const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
  const bodyParser = require("body-parser")
  const { getUser, addUser, getUserEmail, getUsers, getUserName, getUserNameId} = require('./userRoutes')
  const { getProjects, createProject, createUserProject, getSingleProject, updateProject, delProject } = require('./projectRoutes')
  const { getTeam, delTeamMember } = require('./userProjectRoutes')
  const { getZones } = require('./locationRoutes')
  const { getAllCivil, getAllFibre, getAllCoax } = require('./materialRoutes')
  const { getProjQuote, addProjQuote, updateProjQuote, delQuote } = require('./quoteRoutes')

app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

//User Routes
app.use(getUser)
app.use(addUser)
app.use(getUserEmail)
app.use(getUsers)
app.use(getUserName)
app.use(getUserNameId)

//Project Routes
app.use(getProjects)
app.use(createProject)
app.use(createUserProject)
app.use(getSingleProject)
app.use(updateProject)
app.use(delProject)

//Location Routes
app.use(getZones)

//Team Routes
app.use(getTeam)
app.use(delTeamMember)

//MaterialRoutes
app.use(getAllCivil)
app.use(getAllFibre)
app.use(getAllCoax)

//QuoteRoutes
app.use(getProjQuote)
app.use(addProjQuote)
app.use(updateProjQuote)
app.use(delQuote)