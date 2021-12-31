import React from "react";
import { useContext, useState, useEffect } from 'react'
import GanttTable from './ganttComponents/ganttTable'
import { ProjectContext } from './projectContext'
import { TasksContext} from './ganttComponents/taskContext'
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
  onExpanderClick,
  onDateChange,
  onTaskDelete,
  onProgressChange,
  onDoubleClick,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

// let tasks = [
//   {
//     start: new Date(2022, 0, 3),
//     end: new Date(2022, 0, 16),
//     name: "Build",
//     id: "big",
//     type: "project",
//     progress: 100,
//     dependencies: [],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     barChildren: [1,2],
//     hideChildren: false,
//   },
//   {
//     start: new Date(2022, 0, 3),
//     end: new Date(2022, 0, 17),
//     name: "City Permit",
//     id: 1,
//     type: "task",
//     progress: 100,
//     dependencies: [],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     project: "big",
//   },
//   {
//     start: new Date(2022, 0, 18),
//     end: new Date(2022, 0, 24),
//     name: "Civil Build",
//     id: 2,
//     type: "task",
//     progress: 50,
//     dependencies: [1],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     project: "big",
//   },
//   {
//     start: new Date(2022, 1, 3),
//     end: new Date(2022, 1, 16),
//     name: "Plant",
//     id: "big2",
//     type: "project",
//     progress: 100,
//     dependencies: ["big"],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     barChildren: [1,2],
//     hideChildren: false,
//   },
//   {
//     start: new Date(2022, 1, 3),
//     end: new Date(2022, 1, 17),
//     name: "Fibre Build",
//     id: 3,
//     type: "task",
//     progress: 100,
//     dependencies: [],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     project: "big2",
//   },
//   {
//     start: new Date(2022, 1, 18),
//     end: new Date(2022, 1, 24),
//     name: "Place Fibre",
//     id: 4,
//     type: "task",
//     progress: 50,
//     dependencies: [3],
//     styles: { progressColor: "blue", progressSelectedColor: "#ff9e0d" },
//     project: "big2",
//   },

// ];

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

            let Std = Sd.split("-")
            let Ent = Ed.split("-")

            let StMod = new Date(Std[0] + ", " + (Std[1]) + ", " +  Std[2])
            let EnMod = new Date(Ent[0] + ", " +  (Ent[1]) + ", " +  Ent[2])

            arr.push({...tsk, id : nm, start : StMod, end: EnMod})
         
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
      <h2>Schedule:</h2>
    <div className="master" style={{height: 'auto'}}>
      <Split 
              minSize={90}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={0}
              dragInterval={1}
              direction="horizontal"
              cursor="col-resize"
              sizes={[20,80]}
              maxSize={[610]}
              style={{display: 'flex', flexDirection: 'row', height: 'auto'}}
              >
     <div> 
       <GanttTable/>
     </div>
     <div style={{ maxWidth: '800px', marginTop: '0px',height: '398px', backgroundColor: '#2B2D42', borderRadius: '0 15px 15px 0' }}>
    <div style={{ marginTop: '21px', marginLeft: '0px', maxWidth: '1000px'}}>
      {tasks && <Gantt 
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
    </TasksContext.Provider>
  );
}

export default SchedulePage;
