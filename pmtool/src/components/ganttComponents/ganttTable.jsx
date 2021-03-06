import React from 'react'
import { useContext, useEffect } from "react";
import { ProjectContext } from '../projectContext'
import TaskListItem from './taskListItem'
import "./taskList.scss";


function GanttTable(props) {

    const { project } = useContext(ProjectContext);
    const projectFromSession = window.sessionStorage.getItem("project")
    const { ganttRows, binary, setBinary } = props;

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

        let list;
        if(ganttRows && ganttRows.length > 0 ) {
        list = ganttRows.map((item) => {
            return (
                <TaskListItem
                key={item.id}
                id={item.id}
                seq={item.seq}
                name={item.name}
                start={item.start}
                end={item.end}
                type={item.type}
                progress={item.progress}
                dependencies={item.dependencies}
                barchildren={item.barchildren}
                hidechildren={item.hidechildren}
                project={item.project}
                projId={jProject.id}
                binary={binary}
                setBinary={setBinary}
                />
            );
        });
        } else {
        list = ''
        }
    return (
  
       <ul id='teamList3' style={{marginBottom: '0px'}}>
           <div className="listHeader2"> 
               <p style={{minWidth: '40px', marginLeft: '10px', color: '#3B747D'}}><strong>Seq</strong></p>
               <p style={{minWidth: '127px', marginLeft: '10px', color: '#3B747D', wordWrap: 'break-word'}}><strong>Task</strong></p>
               <p style={{minWidth: '90px', marginLeft: '-5px', color: '#3B747D'}}><strong>Type</strong></p>
               <p style={{minWidth: '160px', marginLeft: '10px', color: '#3B747D'}}><strong>Start</strong></p>
               <p style={{minWidth: '183px', marginLeft: '0px', color: '#3B747D'}}><strong>End</strong></p>
               <p style={{minWidth: '50px', marginLeft: '-12px', color: '#3B747D'}}><strong>Prg</strong></p>
               <p style={{minWidth: '150px', marginLeft: '-5px', color: '#3B747D'}}><strong>Dependencies</strong></p>
               <p style={{minWidth: '100px', marginLeft: '5px', color: '#3B747D'}}><strong>Parent</strong></p>
           </div>
           <p>{list}</p>
       </ul>
    )
}

export default GanttTable
