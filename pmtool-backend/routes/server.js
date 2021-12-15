const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");
  const bodyParser = require("body-parser")
  const { getUser } = require('./userRoutes')
  const { getProjects } = require('./projectRoutes')

app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(getUser)


app.use(getProjects)
