// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext, useCallback } from 'react'
import { Form, FormGroup, Input } from "reactstrap";
import { updateQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'
import PositionedMenuTeam from './taskPopUp'
import Switch from '@mui/material/Switch'
import "./taskList.scss";
import { useEffect } from 'react';

const TeamListItem = (props) => {

    const { id, name, start, end, type, progress, dependencies, barchildren, hidechildren, projId } = props
    
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
            // const response = await taskUpdate(id, !swtch)
    }, [swtch]);



    const handleChange = (e) => {

        setFormVals({...formVals, [e.target.name] : e.target.value})
    
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
                    <Input id='inpt' value={formVals.name} style={{minWidth: '120px', maxWidth: '120px'}}>{formVals.name}</Input>
                    <Input id='inpt' onChange={handleChange} name='type' style={{minWidth: '70px', maxWidth: '70px'}} value={formVals.type}>{formVals.type}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='start' type='date' style={{minWidth: '160px', maxWidth: '160px'}} value={formVals.start.substring(0,10)}>{formVals.start}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='end' type='date' style={{minWidth: '160px', maxWidth: '160px'}}value={formVals.end.substring(0,10)}>{formVals.end}</Input>
                    <Input id='inpt' readOnly={formVals.type === 'project' ? true : false} onChange={handleChange} name='progress' value={formVals.progress} style={{minWidth: '60px', maxWidth: '60px', textAlign: 'center'}}>{formVals.progress} </Input>
                    <Input id='inpt' onChange={handleChange} name='dependencies' style={{minWidth: '100px', maxWidth: '100px'}} value={formVals.dependencies}>{formVals.dependencies}</Input>
                    <Input id='inpt' readOnly={formVals.type !== 'project' ? true : false} onChange={handleChange} name='barChildren' style={{minWidth: '100px', maxWidth: '100px'}} value={formVals.barChildren}>{formVals.barChildren}</Input>
                    <div style={{backgroundColor: 'rgb(57, 60, 87)'}}><Switch readOnly={formVals.type !== 'project' ? true : false} checked={swtch} name='hideChildren' value={formVals.hideChildren} onClick={() => handleSwitch()}>{formVals.hideChildren}</Switch></div>
                    <div id='inpt' style={{width: 79, backgroundColor: 'rgb(57, 60, 87)', paddingRight: '20px', marginLeft: '-9px'}}>
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