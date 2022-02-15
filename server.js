const express = require("express");
app = express();
const path = require("path");
cors = require("cors");
const bodyParser = require("body-parser");
const {
  getUser,
  addUser,
  getUserEmail,
  getUsers,
  getUserName,
  getUserNameId,
} = require("./routes/userRoutes");
const {
  getProjects,
  createProject,
  createUserProject,
  getSingleProject,
  updateProject,
  delProject,
} = require("./routes/projectRoutes");
const { getTeam, delTeamMember } = require("./routes/userProjectRoutes");
const { getZones, addNewLocation, delLocation } = require("./routes/locationRoutes");
const { getAllMaterials, getMaterialtypes } = require("./routes/materialRoutes");
const {
  getProjQuote,
  addProjQuote,
  updateProjQuote,
  delQuote,
  getQuoteCosts,
} = require("./routes/quoteRoutes");
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
} = require("./routes/taskRoutes");
const { getAllTasksOfType } = require("./routes/taskNameRoutes")
const { getTotalMaterials, addNewMaterial, updateMaterial, delMaterial } = require("./routes/adminMaterialRoutes")
const { getTotalAdminTasks, addNewAdminTask, updateAdminTask, delAdminTask, getAllTasksCategories, getAllTaskCategories, addNewTaskCategory, delTaskCategory } = require("./routes/adminTasksRoutes")
const { getTotalUsers, addNewUser, updateUser, delUser } = require("./routes/adminUsersRoutes")

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

port = process.env.PORT || 5000

if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "pmtool/build")))
}

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
app.use(addNewLocation);
app.use(delLocation);

//Team Routes
app.use(getTeam);
app.use(delTeamMember);

//Material Routes
app.use(getAllMaterials);
app.use(getMaterialtypes);

//Quote Routes
app.use(getProjQuote);
app.use(addProjQuote);
app.use(updateProjQuote);
app.use(delQuote);
app.use(getQuoteCosts);

//Task Routes
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

//TaskName Routes
app.use(getAllTasksOfType);

//AdminMaterial Routes
app.use(getTotalMaterials);
app.use(addNewMaterial);
app.use(updateMaterial);
app.use(delMaterial);

//AdminTask Routes
app.use(getTotalAdminTasks);
app.use(addNewAdminTask);
app.use(updateAdminTask);
app.use(delAdminTask);
app.use(getAllTasksCategories);
app.use(getAllTaskCategories);
app.use(addNewTaskCategory);
app.use(delTaskCategory);

//AdminUser Routes
app.use(getTotalUsers);
app.use(addNewUser);
app.use(updateUser);
app.use(delUser);

console.log("this", __dirname)
app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname, "pmtool/build/index.html"))
})