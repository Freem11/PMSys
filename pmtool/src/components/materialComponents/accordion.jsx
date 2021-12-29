import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { ProjectContext } from '../projectContext'
import { QuoteContext, QuoteCostContext } from './quoteContext'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ListItem from "@mui/material/ListItem";
import { allMaterials, materialtypes } from '../AxiosFuncs/materialAxiosFuncs';
import { allQuote, addQuote, quoteTotal } from '../AxiosFuncs/quoteAxiosFuncs'
import "./accordion.scss"

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color:'white' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  const [matTypes, setMatTypes] = useState("");
  const [materials, setMaterials] = useState("");
  const { setQuote } = useContext(QuoteContext);
  const { setQuoteCosts } = useContext(QuoteCostContext);

useEffect(() => {

  let matsTypes = materialtypes(jProject.location)
  Promise.all([matsTypes])
  .then((response) => {
    setMatTypes(response[0])
   
  })
  .catch((error) => {
    console.log(error);
  });

  let materials = allMaterials(jProject.location)
  Promise.all([materials])
  .then((response) => {
    setMaterials(response[0])
  })
  .catch((error) => {
    console.log(error);
  });

  }, [])

  const twoX = (name, price) => {

    let quantity = 1
    let cost = quantity * price

   let quoteItem = addQuote({name, price, quantity, cost, id: jProject.id})

    Promise.all([quoteItem])
    .then((response) => {
      let data = allMaterials(jProject.location)
        
    Promise.all([data])
    .then((response2) => {
      setMaterials(response2[0]);

      let bigQ = allQuote(jProject.id)
      Promise.all([bigQ])
      .then((response3) => {
        setQuote(response3[0])

        let total = quoteTotal(jProject.id)

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
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });

}
console.log("this", matTypes)
  return (
    <div style={{width: '300px' }}>
        <h3 style={{marginLeft: 7}}>Available Options</h3>
        <>
           {matTypes && matTypes.map((work) => {
             return(
      <Accordion sx={{borderRadius:'15px', backgroundColor: '#2B2D42', color: 'white'}} expanded={expanded === work.type} onChange={handleChange(work.type)}>
        <AccordionSummary   aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{work.type}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderRadius: '0 0 15px 15px', backgroundColor: 'rgb(49, 51, 75)', color: 'white'}}>
          <Typography>
         {materials && materials.map((material) => {
           if (material.type === work.type){
            return (
                <ListItem
                className="lister"
                onClick={()=>twoX(material.name, material.price)}
                key={material.id}
                >
                    <div className = "materailListItem" >
                        <div >{material.name}</div>
                        <div>${material.price}</div>
                    </div>
        
                </ListItem>
            );
          } })}
          </Typography>
        </AccordionDetails> 
      </Accordion>)
    })}
    </>
    </div>
  );
}
