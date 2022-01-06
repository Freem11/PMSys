import React, { useState, useContext } from 'react';
import { ProjectContext } from '../projectContext'
import { TasksContext, GanttContext } from "./taskContext";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreRounded'
import DeleteIcon from '@mui/icons-material/Delete';
import { allTasks, deleteParent, cleanUpDeps, deleteTask, getTaskStartMin, getTaskEndMax, getAvgProgress, getTaskByName, updateRestTasks } from '../AxiosFuncs/taskAxiosFuncs'
import {formatForGannt, sortDataGantt, handleAvgProgress, updateParentStartDate, updateParentEndDate } from './gantthelper'
const PositionedMenuTeam = (props) => {

  const { taskId ,name, type, parent, start, end, progress } = props
  const { project } = useContext(ProjectContext);
  const { setGanttTasks } = useContext(TasksContext);
  const { setTasks } = useContext(GanttContext);
  const projectFromSession = window.sessionStorage.getItem("project")

let jProject;
    if (project.length > 0) {
      jProject = project;
    } else if (projectFromSession) {
      jProject = [JSON.parse(projectFromSession)];
    } else {
      jProject = {
        id: 0,
        name: "",
      };
    }

  let project1 = jProject[0].id

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const doTwo = (taskId) => {

    console.log("two", taskId, name, project1)

    if (type === 'project') {
      let clearParents = deleteParent({ name: name, projId: project1 })

      Promise.all([clearParents])
      .then((response) => {
        let list = allTasks(jProject[0].id)

          Promise.all([list])
          .then((response) => {

          let newData = sortDataGantt(formatForGannt(response[0]))
          setTasks(newData);

          let sortedData = sortDataGantt(response[0])
          setGanttTasks(sortedData);
    })
    .catch((error) => {
      console.log(error);
    });
    })
  }

  let tidyDependencies = cleanUpDeps({ text: name, projId: project1 })

  Promise.all([tidyDependencies])
  .then((response) => {
    let list = allTasks(jProject[0].id)

      Promise.all([list])
      .then((response) => {

      let newData = sortDataGantt(formatForGannt(response[0]))
      setTasks(newData);

      let sortedData = sortDataGantt(response[0])
      setGanttTasks(sortedData);
})
.catch((error) => {
  console.log(error);
});
})

   

let delTask = deleteTask(taskId)

Promise.all([delTask])
.then((response) => {
  console.log(response);
  let list = allTasks(jProject[0].id)

    Promise.all([list])
    .then((response) => {

      let parentz = getTaskByName({name: parent, id: project1})

      let minStart = getTaskStartMin({project: parent})
      let maxEnd = getTaskEndMax({project: parent})
      let avgprg = getAvgProgress({project: parent, id: project1})
  
      Promise.all([parentz, avgprg, maxEnd, minStart])
      .then((response) => {
        let progressVal = handleAvgProgress(response[0], response[1], name, progress)
        let startVal = updateParentStartDate(progressVal, response[3].starter, 0, start, 0, true)
        let endVal = updateParentEndDate(startVal,response[2].ender, 0, end, 0, true)
  
        let updatie = updateRestTasks(endVal)

        Promise.all([updatie])
        .then((response) => {
          console.log(response)
          let updated2 = allTasks(project1);
    
          Promise.all([updated2])
            .then((response4) => {
   
              let newData = sortDataGantt(formatForGannt(response4[0]))
              setTasks(newData);
  
              let sortedData = sortDataGantt(response4[0])
              setGanttTasks(sortedData);
              
            })
            .catch((error) => {
              console.log(error);
            });
    
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
})
.catch((error) => {
console.log(error);
});
})

}

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: 'lightgrey', marginBottom: -2}}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => doTwo(taskId)}><DeleteIcon/> Delete</MenuItem>
        
      </Menu>
    </div>
    
  );
}

export default PositionedMenuTeam