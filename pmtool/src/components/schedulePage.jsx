import React from "react";
import { useContext, useState, useEffect } from 'react'
import GanttTable from './ganttComponents/ganttTable'
import { ProjectContext } from './projectContext'
import { TasksContext, GanttContext } from './ganttComponents/taskContext'
import { allTasks } from './AxiosFuncs/taskAxiosFuncs'
import Split from 'react-split'
import "./schedulePage.scss"; 

import {
  Gantt,
  GanttProps,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

function SchedulePage() {

  const [ ganttTasks, setGanttTasks ] = useState('');
  const [ tasks, setTasks ] = useState('');
  const { project } = useContext(ProjectContext);
  const projectFromSession = window.sessionStorage.getItem("project")

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
          let arr =[]

          response[0].forEach(tsk => {
  
            let Sd = tsk.start.substring(0,10)
            let Ed = tsk.end.substring(0,10)
            let nm = tsk.name
            let rId = tsk.id
            let Std = Sd.split("-")
            let Ent = Ed.split("-")
            let hide = tsk.hidechildren

            let StMod = new Date(Std[0] + ", " + (Std[1]) + ", " +  Std[2])
            let EnMod = new Date(Ent[0] + ", " +  (Ent[1]) + ", " +  Ent[2])

            arr.push({...tsk, trueId: rId, id : nm, start : StMod, end: EnMod, hideChildren : hide})
          });

          setGanttTasks(response[0])
          setTasks(arr) 
 
      })
      .catch((error) => {
        console.log(error);
      });
    
      }, [])

  return (
    <TasksContext.Provider value={{ganttTasks, setGanttTasks}}>
       <GanttContext.Provider value={{tasks, setTasks}}>
      <h2>Schedule:</h2>
    <div className="master">
      <Split 
              minSize={[90]}
              // expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={2}
              direction="horizontal"
              cursor="col-resize"
              sizes={[20,80]}
              maxSize={[610]}
              style={{display: 'flex', flexDirection: 'row', height: 'auto'}}
              >
     <div> 
       <GanttTable/>
     </div>
     <div style={{ maxWidth: '800px', marginTop: '0px', height: 'auto', backgroundColor: '#2B2D42', borderRadius: '0 15px 15px 0' }}>
    <div style={{ marginTop: '21px', marginLeft: '0px', maxWidth: '1000px'}}>
      {tasks[0] && <Gantt 
        tasks={tasks}
        viewMode={"Week"} 
        barCornerRadius={15}
        arrowColor={'green'}
        barProgressColor={'blue'}
        barProgressSelectedColor={'maroon'}
        onExpanderClick
        TaskListTable={'hidden'}
        TaskListHeader={'hiden'}
      />}
    </div>
    </div>
    </Split>
    </div>
    </GanttContext.Provider>
    </TasksContext.Provider>
  );
}

export default SchedulePage;
