import { useState, useContext, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import { ProjectContext } from "../projectContext";
import { allTasks, getprTskPr, getTaskTypes, getTaskNames } from "../AxiosFuncs/taskAxiosFuncs";
import "./createTask.scss"


const CreateNewTask = (props) => {

  const [parents, setParents] = useState("");
  const [TTypes, setTTypes] = useState("");
  const [TNames, setTNames] = useState("");
  const [list, setList] = useState("");

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


  // const [ formVals, setFormVals ] = useState({
  //   project_id: '',
  //   user_id: ','
  // });


  const handleSubmit = (e) => {

    let opt = e.target.value;

    //     let user = userByName(opt)
    //     Promise.all([user])
    //     .then((response) => {
    //       let uId = response[0][0].id
    //       let pId =  jProject.id
      
    //       registerUserProject(uId, pId)
    //       let list = getTeamByProjectId(jProject.id)
     
    //        Promise.all([list])
    //        .then((response) => {
    //         //  setTeam(response[0].data);
    //        })
    //        .catch((error) => {
    //          console.log(error);
    //        });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // return;
  };


  return (
    <Container fluid>
      <Form>
        <h3 id="newt">Create New Task</h3>

        <div className='majorbox'>
          <div className="leftbox">  
        <FormGroup >
          <div className="namebox">
          <Label for="team"  id="taskname"><strong>Name</strong></Label>
          <Input
            className="tasknamedd"
            type="select" 
            id="select"
            name="team"
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
                  onClick={handleSubmit}
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
            className="tasktypedd"
            type="select" 
            id="select"
            name="ttype"
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
                  onClick={handleSubmit}
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
            className="taskparentdd"
            type="select" 
            disabled={TTypes.value === "project" ? true : false}
            id="select"
            name="team"
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
                  onClick={handleSubmit}
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
            className="taskstartdt"
            type="date" 
            id="text"
            name="team"
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
            className="taskenddt"
            type="date" 
            id="text"
            name="team"
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
            className="taskseqtxt"
            type="text" 
            id="text"
            name="team"
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
            // onChange={handleChange}
            className="taskdependencyms"
            type="select" 
            name="team"
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
      </Form>
    </Container>
  );
};

export default CreateNewTask
  ;
