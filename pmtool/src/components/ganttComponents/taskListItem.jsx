// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback, useRef, useEffect} from "react";
import { Form, Input } from "reactstrap";
import { TasksContext, GanttContext, OverLordContext } from "./taskContext";
import { allTasks, updateHiddenTasks, updateRestTasks, getTaskByName, getTaskStartMin, getTaskStart2Min, getTaskEndMax, getTaskEnd2Max, getprTskPr, getAvgProgress, getTaskTypes, getTaskNames } from "../AxiosFuncs/taskAxiosFuncs";
import PositionedMenuTeam from "./taskPopUp";
import Switch from "@mui/material/Switch";
import "./taskList.scss";
import { formatForGannt, sortDataGantt, updateParentStartDate, updateParentEndDate, updateParentChildArray, manageDependencyArray, handleAvgProgress } from './gantthelper'

const TeamListItem = (props) => {
  const {
    key,
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

  const { binary, setBinary } = useContext(OverLordContext);
  const { ganttRows, setGanttRows } = useContext(TasksContext);
  const { tasks, setTasks } = useContext(GanttContext);

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
    let types = getTaskTypes();
    let names = getTaskNames();

    Promise.all([data, types, names])
      .then((response) => {
        setprojVals(response[0]);
        setTaskTypes(response[1]);
        setTaskNames(response[2]);
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

  useEffect(() => {
   setFormVals({
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
   })
  }, [props, tasks])

  let sortedData;

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

            sortedData = sortDataGantt(response2[0])
            setGanttRows([...sortedData]);
           
            let newData = sortDataGantt(formatForGannt(response2[0]))

            setTasks([...newData]);

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
    if (e.target.name === "start") {
      let endDate = formVals.end;
      let startDate = e.target.value;
      if (endDate !== "" && startDate > endDate) {
        setFormVals({ ...formVals, [e.target.name]: formVals.start });
      } else {
        setFormVals({ ...formVals, start: e.target.value });
      }
    } else if (e.target.name === "end") {
      let endDate = e.target.value;
      let startDate = formVals.start;
      if (startDate !== "" && startDate > endDate) {
        setFormVals({ ...formVals, [e.target.name]: formVals.end });
      } else {
        setFormVals({ ...formVals, [e.target.name]: e.target.value });
      }
    } else {
      setFormVals({ ...formVals, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (type === 'project'){
        
     formVals.dependencies = (typeof formVals.dependencies !== undefined && formVals.dependencies instanceof Array) ? formVals.dependencies : [formVals.dependencies]
     formVals.barchildren = (typeof barchildren !== undefined && barchildren instanceof Array) ? barchildren : [barchildren]
     let updatedo = updateRestTasks(formVals)

      Promise.all([updatedo])
      .then((response) => {

        let updated3 = allTasks(projId);

        Promise.all([updated3])
          .then((response9) => {
 
         setBinary(!binary)

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    } else {
   
    formVals.dependencies = (typeof formVals.dependencies !== undefined && formVals.dependencies instanceof Array) ? formVals.dependencies : [formVals.dependencies]
    // formVals.barchildren = (typeof barchildren !== undefined && barchildren instanceof Array) ? barchildren : [barchildren]
    let updated = updateRestTasks(formVals)

    Promise.all([updated])
    .then((response) => {
   
      let parentz = getTaskByName({name: formVals.project, id: projId})

      let minStart = getTaskStartMin({project: formVals.project, id: projId})
      let min2Start = getTaskStart2Min({project: formVals.project, id: projId})
      let maxEnd = getTaskEndMax({project: formVals.project, id: projId})
      let max2End = getTaskEnd2Max({project: formVals.project, id: projId})

      let parento = getTaskByName({name: e.target.value, id: projId})
      let exParent = getTaskByName({name: oldTasks.project, id: projId})

      let avgprg = getAvgProgress({project: formVals.project, id: projId})
      
      let currentTask = getTaskByName({name: formVals.name, id: projId})

      Promise.all([parentz, minStart, min2Start, maxEnd, max2End, parento, exParent, avgprg, currentTask])
      .then((responsex) => {
        let parentStartDate;
        let parentEndDate;
        let parentProgress;
        let parentDependencies;
        let parentChildArray;
  
        let startVal = responsex[0].start
        let endVal = responsex[0].end
        let progressVal = {val: responsex[0].progress, yes: false}
        let newDependencyVal = responsex[0].dependencies
        let newChildrenVal = responsex[0].barChildren

          if (e.target.name === "start"){
            startVal = e.target.value
          }
          if (e.target.name === "end"){
            endVal = e.target.value
          }
          if (e.target.name === "progress"){
            progressVal = {val: e.target.value, yes: true}
          }
          if (e.target.name === "dependencies"){
            newDependencyVal = e.target.value
          }
          if (e.target.name === "project"){
            newChildrenVal = formVals.name
          }

        parentStartDate = updateParentStartDate(responsex[0], responsex[1].starter, responsex[2].starter, startVal, oldTasks.start, oldTasks.end, formVals, false)
        parentEndDate = updateParentEndDate(responsex[0],responsex[3].ender, responsex[4].ender, endVal, oldTasks.end, false)
        parentChildArray = updateParentChildArray(responsex[0], newChildrenVal, responsex[6])
        parentDependencies = manageDependencyArray(responsex[0], newDependencyVal)
        parentProgress = handleAvgProgress(responsex[0], responsex[7], formVals.name, progressVal, false)

        let updatie = updateRestTasks({...responsex[0], start: parentStartDate, end: parentEndDate, progress: parentProgress, dependencies: parentDependencies, barchildren: parentChildArray})

          Promise.all([updatie])
          .then((response) => {
            let updated2 = allTasks(projId);

            Promise.all([updated2])
              .then((response4) => {
    
                setBinary(!binary)

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
    }
  };

  return (
      <li id={id} key={key} className="teamL2">
      <div id="teamBox3">
        <Form id="teamBox2">
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
            value={formVals.start && formVals.start.substring(0, 10)}
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
            value={formVals.end && formVals.end.substring(0, 10)}
          >
          </Input>
          <Input
            id="inpt"
            disabled={formVals.type === "project" ? true : false}
            onChange={handleChange}
            onBlur={handleSubmit}
            name="progress"
            value={formVals.progress && formVals.progress}
            style={{ minWidth: "60px", maxWidth: "60px", textAlign: "center" }}
          >
          </Input>
          <Input
            id="inpt"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="dependencies"
            style={{ minWidth: "160px", maxWidth: "160px" }}
            value={formVals.dependencies}
          >
          </Input>
    
          {formVals.type !== 'project' ?
          <Input
            id="selecter"
            type="select"
            onChange={handleChange}
            onBlur={handleSubmit}
            name="project"
            style={{fontSize: '15px', color: '#3B747D', minWidth: "80px", maxWidth: "80px", backgroundColor: "#F3F4F6", border: 'transparent'}}
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
          <div style={{ backgroundColor: "#F3F4F6", minWidth: '80px', maxWidth: '80px'}}>
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
              backgroundColor: "#F3F4F6",
              paddingRight: "0px",
              marginLeft: "0px",
              paddingTop: '5px'
            }}
          >
            <PositionedMenuTeam 
            taskId={id} 
            name={name}
            type={type}
            parent={project}
            start={start}
            end={end}
            progress={progress}
            binary={binary}
            setBinary={setBinary}
            />
          </div>
        </Form>
      </div>
    </li>
  );
};

export default TeamListItem;
