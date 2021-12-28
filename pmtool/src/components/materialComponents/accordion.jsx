import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { ProjectContext } from '../projectContext'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ListItem from "@mui/material/ListItem";
import { allCivil, allFibre, allCoax } from '../AxiosFuncs/materialAxiosFuncs';
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
  const [expanded, setExpanded] = React.useState('panel1');

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

  const [civilMats, setCivilMats] = useState("");
  const [fibreMats, setFibreMats] = useState("");
  const [coaxMats, setCoaxMats] = useState("");

useEffect(() => {

    let civil = allCivil(jProject.location)
    Promise.all([civil])
    .then((response) => {
        setCivilMats(response[0])
    })
    .catch((error) => {
      console.log(error);
    });

    let fibre = allFibre(jProject.location)
    Promise.all([fibre])
    .then((response) => {
        setFibreMats(response[0])
    })
    .catch((error) => {
      console.log(error);
    });

    let coax = allCoax(jProject.location)
    Promise.all([coax])
    .then((response) => {
        setCoaxMats(response[0])
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])



  return (
    <div style={{width: '300px' }}>
        <h3>Available Options</h3>
      <Accordion sx={{borderRadius:'15px', backgroundColor: '#2B2D42', color: 'white'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary   aria-controls="panel1d-content" id="panel1d-header">
          <Typography >Civil</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderRadius: '0 0 15px 15px', backgroundColor: 'rgb(49, 51, 75)', color: 'white'}}>
          <Typography>
         {civilMats && civilMats.map((material) => {
            return (
                <ListItem
                className="lister"
                onClick={()=>console.log("matts awesome")}
                key={material.id}
                >
                    <div className = "materailListItem" >
                        <div >{material.name}</div>
                        <div>${material.price}</div>
                    </div>
        
                </ListItem>
            );
            })}

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{borderRadius:'15px', backgroundColor: '#2B2D42', color: 'white'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Fibre</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderRadius: '0 0 15px 15px', backgroundColor: 'rgb(49, 51, 75)', color: 'white'}}>
          <Typography>
          {fibreMats && fibreMats.map((material) => {
            return (
                <ListItem
                className="lister"
                onClick={()=>console.log("matts awesome")}
                key={material.id}
                >
                    <div className = "materailListItem">
                        <div>{material.name}</div>
                        <div>${material.price}</div>
                    </div>
        
                </ListItem>
            );
            })}

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{borderRadius:'15px', backgroundColor: '#2B2D42', color: 'white'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Coax</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderRadius: '0 0 15px 15px', backgroundColor: 'rgb(49, 51, 75)', color: 'white'}}>
          <Typography>
          {coaxMats && coaxMats.map((material) => {
            return (
                <ListItem
                className="lister"
                onClick={()=>console.log("matts awesome")}
                key={material.id}
                >
                    <div className = "materailListItem">
                        <div>{material.name}</div>
                        <div>${material.price}</div>
                    </div>
        
                </ListItem>
            );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
