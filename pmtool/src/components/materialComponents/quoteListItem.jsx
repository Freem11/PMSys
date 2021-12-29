// import PositionedMenuTeam from './teamPopUp'
import { useState } from 'react'
import { allQuote, addQuote, updateQuote, deleteQuoteItem } from '../AxiosFuncs/quoteAxiosFuncs'
import PositionedMenuTeam from './quotePopUp'
import "./quoteList.scss";

const TeamListItem = (props) => {

    const { id, name, price, quantity, cost, projId } = props

  
    const handleChange = (e) => {
            let sigh = e.target.attributes.getNamedItem("listItems3").value
            console.log(sigh)
    }

    return (
        <li id={id} className='teamL' onChange={handleChange}>
            <div id='teamBox'>
            <div id='listItems2'style={{width:190}}>{name}</div> 
            <div id='listItems2'style={{width:100}}>${price}</div> 
            <div data-value={quantity} id='listItems3'style={{backgroundColor: 'rgb(57, 60, 87)', borderRadius: 5}} contenteditable="true"><strong>{quantity}</strong></div> 
            <div id='listItems2'style={{width:100}}>${cost}</div> 
            <div id='teamTg'>
                <PositionedMenuTeam
                partId={id}
                />
            </div>
            </div>
        </li>
    )
} 

export default TeamListItem;