import React from "react";
import { useContext, useState, useEffect } from 'react'
import GanttTable from './ganttComponents/ganttTable'
import { ProjectContext } from './projectContext'
import { TasksContext, GanttContext } from './ganttComponents/taskContext'
import { allTasks } from './AxiosFuncs/taskAxiosFuncs'
import { Button } from "reactstrap";
import FormModal from './ganttComponents/formModal'
import Split from 'react-split'
import CreateNewTask from "./ganttComponents/createTask"
import {formatForGannt, sortDataGantt } from './ganttComponents/gantthelper'
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

  const [modal, setModal] = useState(false)

      const toggleModal = () => {
          setModal(!modal);
      }

  useEffect(() => {

      let quote = allTasks(jProject.id)
      Promise.all([quote])
      .then((response) => {
    
          let newData = sortDataGantt(formatForGannt(response[0]))
          setTasks(newData) 

          let sortedData = sortDataGantt(response[0])
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
      <div className='addtask'>
          <Button onClick={toggleModal} className="creatTaskButton">+ Task</Button>
          </div>
         

            <FormModal openup={modal} closeup={toggleModal} >
              <CreateNewTask
                closeup={toggleModal}
              />
            </FormModal>
            
    <div className="master">
      <Split  sizes={[55.5,44.5]}
              maxSize={[985]}
              minSize={[200]}
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
