// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { TasksContext, GanttContext } from "./taskContext";
import { allTasks, updateHiddenTasks, updateRestTasks, getTaskByName, getTaskStartMin, getTaskStart2Min, getTaskEndMax, getTaskEnd2Max } from "../AxiosFuncs/taskAxiosFuncs";
import PositionedMenuTeam from "./taskPopUp";
import Switch from "@mui/material/Switch";
import "./taskList.scss";
import { useEffect } from "react";
import {formatForGannt, sortDataGantt, sortDataTable, checkParent } from './gantthelper'
const TeamListItem = (props) => {
  const {
    id,
    name,
    start,
    end,
    type,
    progress,
    dependencies,
    barchildren,
    hidechildren,
    project,
    projId,
  } = props;
  const { ganttTasks, setGanttTasks } = useContext(TasksContext);
  const { tasks, setTasks } = useContext(GanttContext);

  const [formVals, setFormVals] = useState({
    id: id,
    name: name,
    start: start,
    end: end,
    type: type,
    progress: progress,
    dependencies: dependencies,
    barChildren: barchildren,
    hideChildren: hidechildren,
    project: project,
    projId: projId,
  });

  const [swtch, setSwtch] = useState(hidechildren);

  const handleSwitch = useCallback(async () => {
    setSwtch((swtch) => !swtch);
    let holder = !swtch;
    const response = await updateHiddenTasks({ id, holder });

    Promise.all([response])
      .then((response1) => {
        let updated = allTasks(projId);
          console.log("hmm?", response1)
        Promise.all([updated])
          .then((response2) => {

            let sortedData = sortDataTable(response2[0])
            console.log("table", sortedData);
            setGanttTasks(sortedData);

            let newData = sortDataGantt(formatForGannt(response2[0]))
            console.log("gannt", newData);
            setTasks(newData);

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [swtch]);

  const handleChange = (e) => {

    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (e.target.name === 'end' || e.target.name === 'start'){
      let parentz = getTaskByName({name: formVals.project, id: projId})

      let minStart = getTaskStartMin({project: formVals.project})
      let min2Start = getTaskStart2Min({project: formVals.project})
      let maxEnd = getTaskEndMax({project: formVals.project})
      let max2End = getTaskEnd2Max({project: formVals.project})

     
      Promise.all([parentz, minStart, min2Start, maxEnd, max2End])
      .then((responsex) => {
        let passVal = responsex[0];
          console.log("work", responsex[0])
        if (e.target.name === 'start' && (responsex[1].starter < e.target.value && e.target.value < responsex[2].starter) ){
              passVal = {...responsex[0], start: e.target.value}
        } else if (e.target.name === 'start' && e.target.value < responsex[1].starter ){
              passVal = {...responsex[0], start: e.target.value}
        } else if (e.target.name === 'start' && e.target.value > responsex[2].starter ){
              passVal = {...responsex[0], start: responsex[2].starter}
        }

        if (e.target.name === 'end' && (responsex[3].ender > e.target.value && e.target.value > responsex[4].ender) ){
               passVal = {...responsex[0], end: e.target.value}
        } else if (e.target.name === 'end' && responsex[3].ender < e.target.value){
              passVal = {...responsex[0], end: e.target.value}
        } else if (e.target.name === 'end' && responsex[4].ender > e.target.value){
              passVal = {...responsex[0], end: responsex[4].ender}
        }
        console.log("work", passVal)
          let updated = updateRestTasks(passVal)

          Promise.all([updated])
          .then((response) => {
      
            let updated2 = allTasks(projId);
      
            Promise.all([updated2])
              .then((response4) => {
     
                let newData = sortDataGantt(formatForGannt(response4[0]))
                setTasks(newData);

                let sortedData = sortDataTable(response4[0])
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
    }
    
    let updated = updateRestTasks(formVals)

    Promise.all([updated])
    .then((response) => {

      let updated = allTasks(projId);

      Promise.all([updated])
        .then((response2) => {

          let sortedData = sortDataTable(response2[0])
          setGanttTasks(sortedData);

          let newData = sortDataGantt(formatForGannt(response2[0]))
          setTasks(newData);

        })
        .catch((error) => {
          console.log(error);
        });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li id={id} className="teamL2">
      <div id="teamBox3">
        <Form id="teamBox2" onSubmit={handleSubmit}>
          <Input
            id="inpt"
            readOnly
            name="name"
            value={formVals.name}
            style={{ minWidth: "120px", maxWidth: "120px" }}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            name="type"
            value={formVals.type}
            style={{ minWidth: "70px", maxWidth: "70px" }}
          >
          </Input>
          <Input
            id="inpt"
            disabled={formVals.type === "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="start"
            type="date"
            style={{ minWidth: "160px", maxWidth: "160px" }}
            defaultValue={formVals.start.substring(0, 10)}
          >
          </Input>
          <Input
            id="inpt"
            disabled={formVals.type === "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="end"
            type="date"
            style={{ minWidth: "160px", maxWidth: "160px" }}
            defaultValue={formVals.end.substring(0, 10)}
          >
          </Input>
          <Input
            id="inpt"
            readOnly={formVals.type === "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="progress"
            defaultValue={formVals.progress}
            style={{ minWidth: "60px", maxWidth: "60px", textAlign: "center" }}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="dependencies"
            style={{ minWidth: "100px", maxWidth: "100px" }}
            defaultValue={formVals.dependencies}
          >
          </Input>
          <Input
            id="inpt"
            readOnly={formVals.type !== "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="barChildren"
            style={{ minWidth: "100px", maxWidth: "100px", overflow: 'scroll'}}
            defaultValue={formVals.barChildren}
          >
          </Input>
          <Input
            id="inpt"
            readOnly={formVals.type === "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="project"
            style={{ minWidth: "100px", maxWidth: "100px", overflow: 'scroll'}}
            value={formVals.project}
          >
          </Input>
          <div style={{ backgroundColor: "rgb(57, 60, 87)" }}>
            <Switch
              readOnly={formVals.type !== "project" ? true : false}
              checked={swtch}
              name="hideChildren"
              value={formVals.hideChildren}
              onClick={() => handleSwitch()}
              sx={{marginTop: '5px'}}
            >
            </Switch>
          </div>
          <div
            id="inpt"
            style={{
              width: 79,
              backgroundColor: "rgb(57, 60, 87)",
              paddingRight: "20px",
              marginLeft: "-9px",
              paddingTop: '5px'
            }}
          >
            <PositionedMenuTeam 
            partId={id} 
            />
          </div>
        </Form>
      </div>
    </li>
  );
};

export default TeamListItem;
