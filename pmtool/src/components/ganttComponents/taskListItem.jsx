// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext } from 'react'
import { Form, FormGroup, Input } from "reactstrap";
import { updateQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'
import PositionedMenuTeam from './taskPopUp'
import "./taskList.scss";

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

    const handleChange = (e) => {
    
        // setFormVals({id: id, name: name, type: type, progress: progress, dependencies: dependencies, barChildren:barChildren, hideChildren:hideChildren, projId: projId})
    
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

      const isProject = () => {
          if (formVals.type === 'project') {
              return false
          }
      }

      const isNotProject = () => {
        if (formVals.type !== 'project') {
            return false
        }
    }

    return (
        <li id={id} className='teamL'>
            <div id='teamBox'>
                <Form id='teamBox' onSubmit={handleSubmit}>
                <FormGroup>
                    <div
                    value={formVals.name}
                    id='listItems2'
                    style={{width: 110}}
                    >{formVals.name}
                    </div>
                </FormGroup>
                <Input value={formVals.type} style={{width: 50}}>{formVals.type} - </Input>
                <Input value={formVals.start.substring(0,10)} style={{width: 80}} contentEditable={isProject}>{formVals.start} - </Input>
                <Input value={formVals.end.substring(0,10)} style={{width: 80}} contentEditable={isProject}>{formVals.end} - </Input>
                <Input value={formVals.progress} style={{width: 40}} contentEditable={isProject}>{formVals.progress} - </Input>
                <Input value={formVals.dependencies} style={{width: 100}}>{formVals.dependencies} - </Input>
                <Input value={formVals.barChildren} style={{width: 100}} contentEditable={isNotProject}>{formVals.barChildren} - </Input>
                <Input value={formVals.hideChildren} style={{width: 40}} contentEditable={isNotProject}>{formVals.hideChildren} - </Input>
                    <div id='teamTg'>
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