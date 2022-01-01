// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback } from 'react'
import { Form, FormGroup, Input } from "reactstrap";
import { TasksContext, GanttContext} from './taskContext'
import { allTasks, updateHiddenTasks } from '../AxiosFuncs/taskAxiosFuncs'
import PositionedMenuTeam from './taskPopUp'
import Switch from '@mui/material/Switch'
import "./taskList.scss";
import { useEffect } from 'react';

const TeamListItem = (props) => {

    const { id, name, start, end, type, progress, dependencies, barchildren, hidechildren, projId } = props
    const { ganttTasks, setGanttTasks } = useContext(TasksContext);
    const { tasks, setTasks } = useContext(GanttContext)

    const [ formVals, setFormVals ] = useState({
        id: id,
        name: name,
        start: start,
        end: end,
        type: type,
        progress: progress,
        dependencies: dependencies,
        barChildren: barchildren,
        hideChildren: hidechildren,
        projId: projId
    });

    const [swtch, setSwtch ] = useState(hidechildren) 

    const handleSwitch = useCallback(async () => {
            setSwtch(swtch => !swtch)
            let holder = !swtch
            const response = await updateHiddenTasks({id, holder})

             Promise.all([response])
            .then((response1) => {
            console.log("!!", projId)
            let updated = allTasks(projId)

            Promise.all([updated])
            .then((response2) => {
                console.log("date?", response2[0])

                let sorted = response2[0].sort(function(a, b) {
                    var nameA = a.id
                    var nameB = b.id
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                  console.log("date?", sorted)
                setGanttTasks(sorted)
                let arr =[]

                response2[0].forEach(tsk => {
        
                  let Sd = tsk.start.substring(0,10)
                  let Ed = tsk.end.substring(0,10)
                  let nm = tsk.name
                  let rId = tsk.id
                  let Std = Sd.split("-")
                  let Ent = Ed.split("-")
                  let hide = tsk.hidechildren
      
                  let StMod = new Date(Std[0] + ", " + (Std[1]) + ", " +  Std[2])
                  let EnMod = new Date(Ent[0] + ", " +  (Ent[1]) + ", " +  Ent[2])
      
                  arr.push({...tsk, trueId: rId, id : nm, start : StMod, end: EnMod, hideChildren : hide})
                });
                console.log("arr", arr)
                let sorted2 = arr.sort(function(a, b) {
                    var nameA = a.trueId
                    var nameB = b.trueId
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  });
                  console.log("arr", sorted2)
                setTasks(sorted2)
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

        setFormVals({...formVals, [e.target.name] : e.target.value})
        console.log(formVals)
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
  
        // let updated = updateQuote(formVals)
  
        // Promise.all([updated])
        // .then((response) => {

        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };

    return (
        <li id={id} className='teamL2'>
            <div id='teamBox3'>
                <Form id='teamBox2' onSubmit={handleSubmit}>
                    <Input id='inpt' readOnly value={formVals.name} style={{minWidth: '120px', maxWidth: '120px'}}>{formVals.name}</Input>
                    <Input id='inpt' onChange={handleChange} name='type' style={{minWidth: '70px', maxWidth: '70px'}} defaulValue={formVals.type}>{formVals.type}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='start' type='date' style={{minWidth: '160px', maxWidth: '160px'}} defaultValue={formVals.start.substring(0,10)}>{formVals.start}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='end' type='date' style={{minWidth: '160px', maxWidth: '160px'}}defaultValue={formVals.end.substring(0,10)}>{formVals.end}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='progress' defaultValue={formVals.progress} style={{minWidth: '60px', maxWidth: '60px', textAlign: 'center'}}>{formVals.progress} </Input>
                    <Input id='inpt' onChange={handleChange} name='dependencies' style={{minWidth: '100px', maxWidth: '100px'}} defaultValue={formVals.dependencies}>{formVals.dependencies}</Input>
                    <Input id='inpt' readOnly={formVals.type !== 'project' ? true : false} onChange={handleChange} name='barChildren' style={{minWidth: '100px', maxWidth: '100px'}} defaultValue={formVals.barChildren}>{formVals.barChildren}</Input>
                    <div style={{backgroundColor: 'rgb(57, 60, 87)'}}><Switch readOnly={formVals.type !== 'project' ? true : false} checked={swtch} name='hideChildren' value={formVals.hideChildren} onClick={() => handleSwitch()}>{formVals.hideChildren}</Switch></div>
                    <div id='inpt' contentEditable={formVals.type !== 'project' ? true : false} style={{width: 79, backgroundColor: 'rgb(57, 60, 87)', paddingRight: '20px', marginLeft: '-9px'}}>
                        <PositionedMenuTeam
                        partId={id}
                        />
                    </div>
                </Form>
            </div>
        </li>
    )
} 

export default TeamListItem;