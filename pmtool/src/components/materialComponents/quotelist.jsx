import React from 'react'
import Divider from '@mui/material/Divider';
import { ProjectContext } from '../projectContext'
import { QuoteContext, QuoteCostContext } from './quoteContext'
import { useContext, useEffect } from "react";
import { allQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'
import QuoteListItem from './quoteListItem'
import "./quoteList.scss";

function Quotelist() {

    const { project } = useContext(ProjectContext);
    const projectFromSession = window.sessionStorage.getItem("project")
    const { quote, setQuote } = useContext(QuoteContext);
    const { quoteCosts, setQuoteCosts } = useContext(QuoteCostContext);

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

        let quoteCost = quoteTotal(jProject.id)
        Promise.all([quoteCost])
        .then((response1) => {
            setQuoteCosts(response1[0].sum) 
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
                projId={item.project_id}
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
                    <p style={{width: '190px', marginLeft: '15px', color: 'white', wordWrap: 'break-word'}}><strong>Item</strong></p>
                    <p style={{width: '100px', marginLeft: '44px', color: 'white'}}><strong>Price</strong></p>
                    <p style={{width: '45px', marginLeft: '-31px', color: 'white'}}><strong>Qty</strong></p>
                    <p style={{width: '100px', marginLeft: '50px', color: 'white'}}><strong>Cost</strong></p>
                </div>
                <p>{list}</p>
                <Divider sx={{backgroundColor: 'white', marginLeft: '13px', orientation: 'horizontal', width: '95%'}}/>
                <div className="totbox">
                <p style={{alignItems: 'left', width: '100px', marginLeft: '15px', color: 'white'}}>Total Cost:</p>
                <p style={{textAlign: 'right', width: '90%', marginLeft: '-134px', color: 'white'}}>${quoteCosts}</p>
                </div>
            </ul>
        </div>
    )
}

export default Quotelist
