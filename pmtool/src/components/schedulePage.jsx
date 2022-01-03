import React from "react";
import { useContext, useState, useEffect } from 'react'
import GanttTable from './ganttComponents/ganttTable'
import { ProjectContext } from './projectContext'
import { TasksContext, GanttContext } from './ganttComponents/taskContext'
import { allTasks } from './AxiosFuncs/taskAxiosFuncs'
import Split from 'react-split'
import {formatForGannt, sortDataTable, sortDataGantt } from './ganttComponents/gantthelper'
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
    
          let newData = sortDataGantt(formatForGannt(response[0]))
          setTasks(newData) 

          let sortedData = sortDataTable(response[0])
          setGanttTasks(sortedData)
          
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
      <Split  sizes={[53.5,46.5]}
              maxSize={[915]}
              minSize={[220]}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={2}
              direction="horizontal"
              cursor="col-resize"
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
        barCornerRadius={12}
        arrowColor={'darkred'}
        barProgressColor={'lightblue'}
        barProgressSelectedColor={'pink'}
        barBackgroundColor={'lightgrey'}
        barBackgroundSelectedColor={'lightgrey'}
        // onExpanderClick
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
