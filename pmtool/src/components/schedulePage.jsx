import React from "react";
import { useContext, useState, useEffect } from 'react'
import GanttTable from './ganttComponents/ganttTable'
import { ProjectContext } from './projectContext'
import { TasksContext, GanttContext, OverLordContext } from './ganttComponents/taskContext'
import { allTasks } from './AxiosFuncs/taskAxiosFuncs'
import { Button } from "reactstrap";
import FormModal from './ganttComponents/formModal'
import Collapse from "@mui/material/Collapse";
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

  const [ binary, setBinary ] = useState(false);
  const [dispGanttTable, setDispGanttTable] = useState(false);

  const [ ganttRows, setGanttRows ] = useState('');
  const [ tasks, setTasks ] = useState([]);

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
          setTasks([...newData]) 

          let sortedData = sortDataGantt(response[0])
          setGanttRows([...sortedData])
          
      })
      .catch((error) => {
        console.log(error);
      });
    
      }, [])

      useEffect(() => {
   
        let quote = allTasks(jProject.id)
        Promise.all([quote])
        .then((response) => {

          let newestData = sortDataGantt(formatForGannt(response[0]))
          setTasks([...newestData]) 
     
          let sortData = sortDataGantt(response[0])
          setGanttRows( [...sortData] )
      
        })
        .catch((error) => {
          console.log(error);
        });
      
        }, [binary])


        const handleGTableDisp = () => {
          setDispGanttTable((prev) => !prev);
        };


        const GTable = (
          <GanttTable ganttRows={ganttRows} setTable={setGanttRows} binary={binary} setBinary={setBinary} style={{boxShadow: "0px 5px 8px -1px #000000"}}/>
        );
      

  return (
    <GanttContext.Provider value={{tasks, setTasks}}>
    <TasksContext.Provider value={{ganttRows, setGanttRows}}>
      <h2>Schedule:</h2>
      <div className='addtask'>
          <Button onClick={toggleModal} className="creatTaskButton">+ Task</Button>
          </div>
         

            <FormModal openup={modal} closeup={toggleModal} >
              <CreateNewTask
                closeup={toggleModal}
              />
            </FormModal>

          <button type="button" className="buttonlogin" onClick={handleGTableDisp} style={{height: '30px', width: '150px', textOrientation: 'upright', writingMode: 'vertical-rl'}}>
            Show/Hide Table
          </button> 
    <div className="master" style={{width: '1790px', borderRadius: '15px', marginTop: '10px'}}>

     <div> 
      <OverLordContext.Provider value={{binary, setBinary}}>
          <Collapse in={dispGanttTable} orientation='horizontal' collapsedSize='175px'>{GTable}</Collapse> 
      </OverLordContext.Provider>
     </div>
     <div style={{ zIndex:1, maxWidth: '800px', minWidth: '0px', marginTop: '0px', height: 'auto', backgroundColor: '#3B747D', borderRadius: '0 15px 15px 0' }}>
    <div style={{ marginTop: '20px', marginRight: '20px'}}>
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

    </div>
    </TasksContext.Provider>
    </GanttContext.Provider>
  );
}

export default SchedulePage;
