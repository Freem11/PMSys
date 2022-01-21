const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
const bodyParser = require("body-parser");
const {
  getUser,
  addUser,
  getUserEmail,
  getUsers,
  getUserName,
  getUserNameId,
} = require("./userRoutes");
const {
  getProjects,
  createProject,
  createUserProject,
  getSingleProject,
  updateProject,
  delProject,
} = require("./projectRoutes");
const { getTeam, delTeamMember } = require("./userProjectRoutes");
const { getZones } = require("./locationRoutes");
const { getAllMaterials, getMaterialtypes } = require("./materialRoutes");
const {
  getProjQuote,
  addProjQuote,
  updateProjQuote,
  delQuote,
  getQuoteCosts,
} = require("./quoteRoutes");
const {
  getProjTasks,
  updateHiddenTasks,
  updateTaskRest,
  getSingleTask,
  getMinStart,
  get2MinStart,
  getMaxEnd,
  get2MaxEnd,
  getProjTaskProj,
  getAvgProg,
  getTskTypes,
  getTskNames,
  delParent,
  cleanUpDependencies,
  delTask,
  addProjTask,
  getProjTaskCat,
  getMaxSequence,
} = require("./taskRoutes");
const { getAllTasksOfType } = require("./taskNameRoutes")

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

//User Routes
app.use(getUser);
app.use(addUser);
app.use(getUserEmail);
app.use(getUsers);
app.use(getUserName);
app.use(getUserNameId);

//Project Routes
app.use(getProjects);
app.use(createProject);
app.use(createUserProject);
app.use(getSingleProject);
app.use(updateProject);
app.use(delProject);

//Location Routes
app.use(getZones);

//Team Routes
app.use(getTeam);
app.use(delTeamMember);

//MaterialRoutes
app.use(getAllMaterials);
app.use(getMaterialtypes);

//QuoteRoutes
app.use(getProjQuote);
app.use(addProjQuote);
app.use(updateProjQuote);
app.use(delQuote);
app.use(getQuoteCosts);

//TaskRoutes
app.use(getProjTasks);
app.use(updateHiddenTasks);
app.use(addProjTask);
app.use(updateTaskRest);
app.use(getSingleTask);
app.use(getMinStart);
app.use(get2MinStart);
app.use(getMaxEnd);
app.use(get2MaxEnd);
app.use(getProjTaskProj);
app.use(getAvgProg);
app.use(getTskTypes);
app.use(getTskNames);
app.use(delParent);
app.use(cleanUpDependencies);
app.use(delTask);
app.use(getProjTaskCat);
app.use(getMaxSequence);

//TaskNameRoutes
app.use(getAllTasksOfType);