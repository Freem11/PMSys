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
            <ul id='teamList2'>
                <p>{list}</p>
            </ul>
        </div>
    )
}

export default Quotelist
