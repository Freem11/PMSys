// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback, useRef, useEffect} from "react";
import { Form, Input } from "reactstrap";
import { TasksContext, GanttContext } from "./taskContext";
import { allTasks, updateHiddenTasks, updateRestTasks, getTaskByName, getTaskStartMin, getTaskStart2Min, getTaskEndMax, getTaskEnd2Max, getprTskPr, getAvgProgress, getTaskTypes, getTaskNames } from "../AxiosFuncs/taskAxiosFuncs";
import PositionedMenuTeam from "./taskPopUp";
import Switch from "@mui/material/Switch";
import "./taskList.scss";
import {formatForGannt, sortDataGantt, sortDataTable, updateParentStartDate, updateParentEndDate, updateParentChildArray, manageDependencyArray, handleAvgProgress } from './gantthelper'
const TeamListItem = (props) => {
  const {
    id,
    seq,
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

  const { setGanttTasks } = useContext(TasksContext);
  const { setTasks } = useContext(GanttContext);

  const prevTasks = useRef()
  useEffect(() => {
    prevTasks.current = props
  })
  const oldTasks = prevTasks.current

  const [projVals, setprojVals] = useState('')
  const [taskTypes, setTaskTypes] = useState('')
  const [taskNames, setTaskNames] = useState('')

  useEffect(() => {

    let data = getprTskPr(projId);

    Promise.all([data])
      .then((response) => {
        setprojVals(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    let types = getTaskTypes();

    Promise.all([types])
      .then((response1) => {
        setTaskTypes(response1[0]);
      })
      .catch((error) => {
        console.log(error);
      });

      let names = getTaskNames();

      Promise.all([names])
        .then((response2) => {
          setTaskNames(response2[0]);
        })
        .catch((error) => {
          console.log(error);
        });

  }, []);

  const [formVals, setFormVals] = useState({
    id: id,
    seq: seq,
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
  }, [swtch]);

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
      let parentz = getTaskByName({name: formVals.project, id: projId})

      let minStart = getTaskStartMin({project: formVals.project})
      let min2Start = getTaskStart2Min({project: formVals.project})
      let maxEnd = getTaskEndMax({project: formVals.project})
      let max2End = getTaskEnd2Max({project: formVals.project})

      let parento = getTaskByName({name: e.target.value, id: projId})
      let exParent = getTaskByName({name: oldTasks.project, id: projId})

      let avgprg = getAvgProgress({project: formVals.project, id: projId})
      let currentTask = getTaskByName({name: formVals.name, id: projId})

      Promise.all([parentz, minStart, min2Start, maxEnd, max2End, parento, exParent, avgprg, currentTask])
      .then((responsex) => {
        let passVal = responsex[0];

        if (e.target.name === 'seq') {
          console.log("seq change", formVals)
        }
        if (e.target.name === 'name') {
          console.log("name change", formVals)
        }
        if (e.target.name === 'type') {
          console.log("type change", formVals)
        }

        if (e.target.name === 'start') {
            passVal = updateParentStartDate(responsex[0], responsex[1].starter, responsex[2].starter, e.target.value, oldTasks.start)
        }

        if (e.target.name === 'end') {
            passVal = updateParentEndDate(responsex[0],responsex[3].ender, responsex[4].ender, e.target.value, oldTasks.end)
        }

        if (e.target.name === 'project') {
            passVal = updateParentChildArray(responsex[5], formVals.name, responsex[6])
        }

        if (e.target.name === 'dependencies') {
          passVal = manageDependencyArray(responsex[8], e.target.value)
        }
         
        if (e.target.name === 'progress') {
          passVal = handleAvgProgress(responsex[0], responsex[7], formVals.name, e.target.value)
        }


        // console.log("didi i work1?", passVal)
          let updated = updateRestTasks(passVal)

          Promise.all([updated])
          .then((response) => {
            // console.log("didi i work2?", response)
            let updated2 = allTasks(projId);
      
            Promise.all([updated2])
              .then((response4) => {
     
                let newData = sortDataGantt(formatForGannt(response4[0]))
                console.log("didi i work3?", newData)
                setTasks(newData);

                let sortedData = sortDataTable(response4[0])
                console.log("didi i work4?", sortedData)
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
    
    
    let updated = updateRestTasks(formVals)

    Promise.all([updated])
    .then((response) => {
      let updated = allTasks(projId);

      Promise.all([updated])
        .then((response2) => {

          let sortedData = sortDataTable(response2[0])
          console.log(sortedData)
          setGanttTasks(sortedData);

          let newData = sortDataGantt(formatForGannt(response2[0]))
          console.log(newData)
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
            onChange={handleChange}
            onBlur={handleSubmit}
            name="seq"
            type="text"
            style={{ paddingLeft: '20px',minWidth: "50px", maxWidth: "50px" }}
            value={formVals.seq}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            type='select'
            name="name"
            value={formVals.name}
            style={{ minWidth: "120px", maxWidth: "120px" }}
          >
             {taskNames && taskNames.map((name, index) => (
                <option
                  id={index}
                  name="tsktyp"
                  key={name.id}
                  values={name.id}
                  className="modalSelect"
                >
                  {name.name}
                </option>
              ))}
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            type='select'
            name="type"
            value={formVals.type}
            style={{ minWidth: "100px", maxWidth: "100px" }}
          >
            {taskTypes && taskTypes.map((name, index) => (
                <option
                  id={index}
                  name="tsktyp"
                  key={name.id}
                  values={name.id}
                  className="modalSelect"
                >
                  {name.name}
                </option>
              ))}
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
            disabled={formVals.type === "project" ? true : false}
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
            style={{ minWidth: "160px", maxWidth: "160px" }}
            defaultValue={formVals.dependencies}
          >
          </Input>
    
          {formVals.type !== 'project' ?
          <Input
            id="selecter"
            type="select"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="project"
            style={{fontSize: '15px', color: 'white', minWidth: "80px", maxWidth: "80px", backgroundColor: "rgb(57, 60, 87)", border: 'transparent'}}
            value={formVals.project}
          >
             <option
                  id={-1}
                  name="empty"
                  key={id}
                  values={id}
                  className="modalSelect"
                >
                </option>
            {projVals && projVals.map((name, index) => (
                <option
                  id={index}
                  name="projname"
                  key={name.id}
                  values={name.id}
                  className="modalSelect"
                >
                  {name.name}
                </option>
              ))}
          </Input>
          :   
          <div style={{ backgroundColor: "rgb(57, 60, 87)", minWidth: '80px', maxWidth: '80px'}}>
            <Switch
              checked={swtch}
              name="hideChildren"
              value={formVals.hideChildren}
              onClick={() => handleSwitch()}
              sx={{marginTop: '5px', marginLeft: '-5px'}}
            >
            </Switch>
          </div>
          }
          <div
            id="inpt"
            style={{
              width: 79,
              backgroundColor: "rgb(57, 60, 87)",
              paddingRight: "0px",
              marginLeft: "0px",
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
