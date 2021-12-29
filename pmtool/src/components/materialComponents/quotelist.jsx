import React from 'react'
import { ProjectContext } from '../projectContext'
import { QuoteContext } from './quoteContext'
import { useState, useContext, useEffect } from "react";
import { allQuote } from '../AxiosFuncs/quoteAxiosFuncs'
import QuoteListItem from './quoteListItem'
import "./quoteList.scss";

function Quotelist() {

    const { project } = useContext(ProjectContext);
    const projectFromSession = window.sessionStorage.getItem("project")
    const { quote, setQuote } = useContext(QuoteContext);

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

        let quote = allQuote(jProject.id)
        Promise.all([quote])
        .then((response) => {

          setQuote(response[0]) 
        })
        .catch((error) => {
          console.log(error);
        });
      
        }, [])
        
        let list;
        if(quote && quote.length > 0 ) {
        list = quote.map((item) => {
            return (
                <QuoteListItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                cost={item.totalcost}
                projId={item.projId}
                />
            );
        });
        } else {
        list = ''
        }

    return (
        <div>
             <h3 style={{marginLeft: 7}} >My Quote</h3>
            <ul id='teamList2'>
                <div className="listHeader">
                    <p style={{width: '190px', marginLeft: '10px', color: 'white', wordWrap: 'break-word'}}><strong>Item</strong></p>
                    <p style={{width: '100px', marginLeft: '5px', color: 'white'}}><strong>Price</strong></p>
                    <p style={{width: '45px', marginLeft: '5px', color: 'white'}}><strong>Qty</strong></p>
                    <p style={{width: '100px', marginLeft: '10px', color: 'white'}}><strong>Cost</strong></p>
                </div>
                <p>{list}</p>
            </ul>
        </div>
    )
}

export default Quotelist
