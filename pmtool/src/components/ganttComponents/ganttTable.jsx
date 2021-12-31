import React from 'react'
import { useContext, useEffect } from "react";
import { ProjectContext } from '../projectContext'
import { TasksContext } from './taskContext'
import { allTasks } from '../AxiosFuncs/taskAxiosFuncs'
import TaskListItem from './taskListItem'
import { ListItemSecondaryAction } from '@mui/material';

function GanttTable() {

    const { project } = useContext(ProjectContext);
    const projectFromSession = window.sessionStorage.getItem("project")
    const { ganttTasks, setGanttTasks } = useContext(TasksContext);

    let jProject
    if (project[0]) {
      jProject = project[0];
    } else if (projectFromSession) {
      jProject = JSON.parse(projectFromSession);
    } else {
      jProject = {
        id: 0,
        name: "",
      };
    }

    useEffect(() => {

        let quote = allTasks(jProject.id)
        Promise.all([quote])
        .then((response) => {
            setGanttTasks(response[0]) 
        })
        .catch((error) => {
          console.log(error);
        });
      
        }, [])
        
        let list;
        if(ganttTasks && ganttTasks.length > 0 ) {
        list = ganttTasks.map((item) => {
            return (
                <TaskListItem
                key={item.id}
                id={item.id}
                name={item.name}
                start={item.start}
                end={item.end}
                type={item.type}
                progress={item.progress}
                dependencies={item.dependencies}
                barchildren={item.barchildren}
                hidechildren={item.hidechildren}
                />
            );
        });
        } else {
        list = ''
        }
    return (
        <div>
        <h3 style={{marginLeft: 7}} >My Quote</h3>
       <ul id='teamList2'>
           <div className="listHeader">
               <p style={{width: '110px', marginLeft: '15px', color: 'white', wordWrap: 'break-word'}}><strong>Task</strong></p>
               <p style={{width: '80px', marginLeft: '-5px', color: 'white'}}><strong>Type</strong></p>
               <p style={{width: '80px', marginLeft: '-15px', color: 'white'}}><strong>Start</strong></p>
               <p style={{width: '80px', marginLeft: '5px', color: 'white'}}><strong>End</strong></p>
               <p style={{width: '40px', marginLeft: '-20px', color: 'white'}}><strong>Prg</strong></p>
               <p style={{width: '100px', marginLeft: '0px', color: 'white'}}><strong>Depends</strong></p>
               <p style={{width: '100px', marginLeft: '-20px', color: 'white'}}><strong>Children</strong></p>
           </div>
           <p>{list}</p>
       </ul>
   </div>
    )
}

export default GanttTable
