// import PositionedMenuTeam from './teamPopUp'
import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Input } from "reactstrap";
import { allQuote, addQuote, updateQuote, deleteQuoteItem } from '../AxiosFuncs/quoteAxiosFuncs'
import PositionedMenuTeam from './quotePopUp'
import "./quoteList.scss";

const TeamListItem = (props) => {

    const { id, name, price, quantity, cost, projId } = props

    const [ formVals, setFormVals ] = useState({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        cost: cost,
        projId: projId
    });

    const handleChange = (e) => {
    
        let cst = Math.round((price * Number(e.target.value)) *100) /100
        setFormVals({id: id, name: name, price: price, quantity: e.target.value, cost: cst, projId: projId})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
  
        let updated = updateQuote(formVals)
  
        Promise.all([updated])
        .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
      };

    return (
        <li id={id} className='teamL'>
            <div id='teamBox'>
                <Form id='teamBox' onSubmit={handleSubmit}>
                <FormGroup>
                    <div
                    value={formVals.name}
                    id='listItems2'
                    style={{width: 190}}
                    >{formVals.name}
                    </div>
                </FormGroup>
                <FormGroup>
                    <div
                    value={formVals.price}
                    id='listItems2'
                    style={{width: 100}}
                    >${formVals.price}
                    </div>
                </FormGroup>
                <FormGroup>
                    <Input
                    value={formVals.quantity}
                    id='listItems3'
                    onChange={handleChange}
                    style={{backgroundColor: 'rgb(57, 60, 87)', borderRadius: 5, width: 30}}
                    >
                    </Input>
                </FormGroup>
                <FormGroup>
                    <div
                    value={formVals.cost}
                    id='listItems2'
                    style={{width: 100}}
                    >${formVals.cost}
                    </div>
                </FormGroup>
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