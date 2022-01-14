import { useState, useContext, useEffect } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import { ProjectContext } from "../projectContext";
import { TasksContext, GanttContext } from "./taskContext";
import { allTasks, addTask, getprTskPr, getTaskTypes, getTaskNames, getTaskStartMin, getTaskEndMax, getAvgProgress, getTaskByName, updateRestTasks } from "../AxiosFuncs/taskAxiosFuncs";
import {formatForGannt, sortDataGantt, handleAvgProgress, updateParentStartDate, updateParentEndDate, updateParentChildArray  } from './gantthelper'
import "./createTask.scss"


const CreateNewTask = (props) => {

  const { closeup } = props

  const [parents, setParents] = useState("");
  const [TTypes, setTTypes] = useState("");
  const [TNames, setTNames] = useState("");
  const [list, setList] = useState("");

  const { project } = useContext(ProjectContext);
  const { setGanttTasks } = useContext(TasksContext);
  const { setTasks } = useContext(GanttContext);

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
    let parentTasks = getprTskPr(jProject.id);
    let taskTypes = getTaskTypes();
    let taskNames = getTaskNames();
    let taskList = allTasks(jProject.id)

    Promise.all([parentTasks, taskTypes, taskNames, taskList])
      .then((response) => {
        setList(response[3])
        setTNames(response[2]);
        setTTypes(response[1]);
        setParents(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const [ formVals, setFormVals ] = useState({ 
    seq: 0,
    name: '',
    start: '',
    end: '',
    type: '',
    progress: 0,
    dependencies: [],
    hideChildren: false,
    barChildren: [],
    project: '',
    project_id: jProject.id,
  });

  const handleChange = (e) => {
    let opts = [],
      opt;
      
    if (e.target.type === "select" || e.target.type === "select-multiple") {
      for (let i = 0; i < e.target.options.length; i++) {
        opt = e.target.options[i];

        if (opt.selected) {
          opts.push(opt.value);
        }
      }
      setFormVals({ ...formVals, [e.target.name]: opts });
    } else if (e.target.value === "project" && e.target.name === "type") {
      opt = e.target.value;
      let today = new Date()
      let tommorow = new Date(today)
      tommorow.setDate(tommorow.getDate()+1)
      setFormVals({ ...formVals, [e.target.name]: opt, project: '', start: today, end: tommorow });
    } else {
      opt = e.target.value;
      setFormVals({ ...formVals, [e.target.name]: opt });
    }
    
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if ( formVals.type === 'project'){
      let tasko = addTask(formVals)
      Promise.all([tasko])
      .then((response) => {

        let updated2 = allTasks(jProject.id);
  
        Promise.all([updated2])
          .then((response4) => {
 
            let newData = sortDataGantt(formatForGannt(response4[0]))
            setTasks(newData);

            let sortedData = sortDataGantt(response4[0])
            setGanttTasks(sortedData);
            
          })
          .catch((error) => {
            console.log(error);
          });
  
        })
        .catch((error) => {
          console.log(error);
        });
    } else {

      let tasko = addTask(formVals)
        Promise.all([tasko])
        .then((response) => {

    let parentTask = getTaskByName({name: response[0].project, id: jProject.id})

    let parentTaskStart = getTaskStartMin({project: response[0].project, id: jProject.id})
    let parentTaskEnd = getTaskEndMax({project: response[0].project, id: jProject.id})
    let parentTaskProgress = getAvgProgress({project: response[0].project, id: jProject.id})

    Promise.all([parentTask, parentTaskProgress, parentTaskEnd, parentTaskStart])
    .then((response1) => {
      let newParentProgress = handleAvgProgress(response1[0], response1[1], formVals.name, formVals.progress, false)
      let newParentStartDate = updateParentStartDate(response1[0], response1[3].starter, 0, formVals.start, 0, 0, 0, false)
      let newParentEndDate = updateParentEndDate(response1[0], response1[2].ender, 0, formVals.end, 0, false)
      let newParentChildrenArray;
      if (formVals.project !== '') {
      newParentChildrenArray = updateParentChildArray(response1[0], formVals.name)
      } else {
      newParentChildrenArray = response1[0].barChildren
      }
      let updatie = updateRestTasks( {...response1[0], progress: newParentProgress, start: newParentStartDate, end: newParentEndDate, barchildren: newParentChildrenArray } )

      Promise.all([updatie])
      .then((response) => {
        let updated2 = allTasks(jProject.id);
  
        Promise.all([updated2])
          .then((response4) => {
 
            let newData = sortDataGantt(formatForGannt(response4[0]))
            setTasks(newData);

            let sortedData = sortDataGantt(response4[0])
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
  })
  .catch((error) => {
    console.log(error);
  });
}
        closeup()
    return;
  };


  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <h3 id="newt">Create New Task</h3>

        <div className='majorbox'>
          <div className="leftbox">  
        <FormGroup >
          <div className="namebox">
          <Label for="team"  id="taskname"><strong>Name</strong></Label>
          <Input
            onChange={handleChange}
            className="tasknamedd"
            type="select" 
            id="select"
            name="name"
            bsSize="lg"
          >
            <option
                  id={-1}
                  name="empty"
                  key={-1}
                  values={-1}
                  className="modalSelect"
                >
                </option>
            {TNames && TNames.map((name, index) => (
                <option
                  id={index}
                  name="team"
                  key={name.id}
                  values={name.id}
                  className="modalSelect"
                >
                  {name.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>

        <FormGroup >
          <div className="typebox">
          <Label for="team"  id="tasktype"><strong>Type</strong></Label>
          <Input
            onChange={handleChange}
            className="tasktypedd"
            type="select" 
            id="select"
            name="type"
            bsSize="lg"
          >
            <option
                  id={-1}
                  name="empty"
                  key={-1}
                  values={-1}
                  className="modalSelect"
                >
                </option>
            {TTypes && TTypes.map((type, index) => (
                <option
                  id={index}
                  name="team"
                  key={type.id}
                  values={type.id}
                  className="modalSelect"
                >
                  {type.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>

        <FormGroup >
          <div className="parentbox">
          <Label for="team"  id="taskparent"><strong>Parent</strong></Label>
          <Input
            onChange={handleChange}
            className="taskparentdd"
            type="select" 
            value={formVals.project}
            disabled={formVals.type === "project" ? true : false}
            id="select"
            name="project"
            bsSize="lg"
          >
            <option
                  id={-1}
                  name="empty"
                  key={-1}
                  values={-1}
                  className="modalSelect"
                >
                </option>
            {parents && parents.map((prnt, index) => (
                <option
                  id={index}
                  name="team"
                  key={prnt.id}
                  values={prnt.id}
                  className="modalSelect"
                >
                  {prnt.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>

        <FormGroup >
          <div className="startbox">
          <Label for="team"  id="taskstart"><strong>Start Date</strong></Label>
          <Input
            onChange={handleChange}
            className="taskstartdt"
            readOnly={formVals.type === "project" ? true : false}
            type="date" 
            id="text"
            name="start"
            bsSize="lg"
            defaultValue = {0}
          >
          </Input>
          </div>
        </FormGroup>

        <FormGroup >
          <div className="endbox">
          <Label for="team" id="taskend"><strong>End Date</strong></Label>
          <Input
            onChange={handleChange}
            className="taskenddt"
            readOnly={formVals.type === "project" ? true : false}
            type="date" 
            id="text"
            name="end"
            bsSize="lg"
            defaultValue = {0}
          >
          </Input>
          </div>
        </FormGroup>
        </div>

        <div className="rightbox">
        <FormGroup >
          <div className="seqbox">
          <Label for="team"  id="taskseq"><strong>Sequence</strong></Label>
          <Input
            onChange={handleChange}
            className="taskseqtxt"
            type="text" 
            id="text"
            name="seq"
            bsSize="lg"
            defaultValue = {0}
          >
          </Input>
          </div>
        </FormGroup>

        <FormGroup >
          <div className="dependencybox">
          <Label for="team" id="taskdependency"><strong>Dependencies</strong></Label>
          <Input
            onChange={handleChange}
            className="taskdependencyms"
            type="select" 
            name="dependencies"
            multiple
            bsSize="lg"
          >
            {list && list.map((task, index) => (
                <option
                  id={index}
                  name="team"
                  key={task.id}
                  values={task.id}
                  className="modalSelect"
                >
                  {task.name}
                </option>
              ))}
          </Input>
          </div>
        </FormGroup>
        </div>
        </div>
        <FormGroup>
          <Button id="modalTask">Create Task</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateNewTask
  ;
