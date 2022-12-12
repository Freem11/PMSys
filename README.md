# PMSys (working title) 
Is a Project Management Sytem I have wanted to build for years

The aim is have this app follow the "living document" philosophy common in project managment

This means that work done in the early stages will be reusable as you progress to later stages 

# Setup
Install back-end dependencies with npm install, (inside the pm-project folder)

Install front-end dependencies with npm install(inside the pmtool folder) 

setup Postgress Db credentials in .env file

# Run Backend 
node.server.js

# Run Frontend
npm start

# Current Features:

Users can login/ register

View, Create, Edit, Delete and their own projects

Re-assign a project to another user

Designate project team members at creation as well as after the fact

Add and remove other users from the project team

Start a project plan based on labour and materials, materials list is keyed to location of the project (aka you will only be shown materials that are available in the area of your project)

Build out a proposed labour and materials list that outlines proposed total cost for the project

Build out a Gantt Chart allowing for parent "project" task to hold child tasks,
Children can been hidden/show by toggling a switch
Dependiencies can be created between tasks
Set start and end dates for each task as well as progress of tasks, which feeds into parent task charactertisitcs 

As Materials/Labour items are added to the project plan, Gantt chart is automatically updated with corresponding task

# Admin section for:
registering/removing or editting Labour/ Materials, 
adding/removing project locations 
registering/removing or editting Gantt Task options
registering, editting, removing or updating to admin users 

# Planned Features:

Map view of projects (polygon for footprint of construction project sites)

Material ordering using the inital planned materials & labour list which then reduced amount left in the budget as materials and labour are issued

# ScreenShots

!["Screenshot of Auth Screen"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.36.26%20PM.png)
!["Screenshot of Projects Page"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.36.59%20PM.png)
!["Screenshot of Create Project"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.37.28%20PM.png)
!["Screenshot of Team Page"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.38.21%20PM.png)
!["Screenshot of Quote Page"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.41.40%20PM.png)
!["Screenshot of Gantt Closed"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.39.04%20PM.png)
!["Screenshot of Gantt Open"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.39.22%20PM.png)
!["Screenshot of Gannt Close Phase"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.39.33%20PM.png)
!["Screenshot of Gannt Add Task"](https://github.com/Freem11/PMSys/blob/master/pmtool/src/components/images/Screenshot%202022-12-08%20at%205.38.55%20PM.png)






