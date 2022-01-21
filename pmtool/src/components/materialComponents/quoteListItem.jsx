// import PositionedMenuTeam from './teamPopUp'
import { useState, useContext } from 'react'
import { Form, FormGroup, Input } from "reactstrap";
import { QuoteCostContext } from './quoteContext'
import { updateQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'
import PositionedMenuTeam from './quotePopUp'
import "./quoteList.scss";

const QuoteListItem = (props) => {

    const { id, name, price, quantity, cost, projId } = props
    const { setQuoteCosts } = useContext(QuoteCostContext);

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
    

        let total = quoteTotal(projId)

        Promise.all([total])
        .then((response) => {
            setQuoteCosts(response[0].sum) 
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
  
        let updated = updateQuote(formVals)
  
        Promise.all([updated])
        .then((response) => {

            let total = quoteTotal(projId)

            Promise.all([total])
            .then((response) => {
                setQuoteCosts(response[0].sum) 
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
        <li id={id} className='teamL'>
            <div id='teamBox'>
                <Form id='teamBox' onBlur={handleSubmit}>
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
                    style={{justifyContent: 'right', width: 100}}
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
                    style={{justifyContent: 'right', width: 100}}
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

export default QuoteListItem;