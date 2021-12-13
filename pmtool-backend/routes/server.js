const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
  const db = require('../lib/userQueries.js')
  const { getUsers } = require('./userRoutes')

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(getUsers)
app.use(getUser)
