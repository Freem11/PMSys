import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { ProjectContext } from "../projectContext";
import { QuoteContext, QuoteCostContext } from "./quoteContext";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import { allMaterials, materialtypes } from "../AxiosFuncs/materialAxiosFuncs";
import { allQuote, addQuote, quoteTotal } from "../AxiosFuncs/quoteAxiosFuncs";
import { getTaskByCat, getSeqMax, addTask } from "../AxiosFuncs/taskAxiosFuncs";
import { allTasksByCategory } from "../AxiosFuncs/taskNameAxiosFuncs";
import "./accordion.scss";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { project } = useContext(ProjectContext);
  const projectFromSession = window.sessionStorage.getItem("project");

  let jProject;
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
    let matsTypes = materialtypes(jProject.location);
    Promise.all([matsTypes])
      .then((response) => {
        setMatTypes(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    let materials = allMaterials(jProject.location);
    Promise.all([materials])
      .then((response) => {
        setMaterials(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const twoX = (name, price, type) => {
    let quantity = 1;
    let cost = quantity * price;

    let quoteItem = addQuote({ name, price, quantity, cost, id: jProject.id });
    let taskCategory = getTaskByCat({ type: type, id: jProject.id });
    let maxSeq = getSeqMax({ id: jProject.id });
    let taskByCategory = allTasksByCategory(type);

    Promise.all([quoteItem, taskCategory, maxSeq, taskByCategory])
      .then((response) => {
        let tick = Number(response[2].maxSeq);
        let children = [];
        response[3].forEach((task) => { 
          if (task.name !== taskCategory) {}
            children.push(task.name)
        });

        if (response[1].length === 0) {
          response[3].forEach((task) => {
            if (task.name === type) {
              tick++;
              addTask({
                seq: tick,
                name: task.name,
                start: new Date(),
                end: new Date(),
                type: "project",
                progress: 0,
                dependencies: [],
                hideChildren: false,
                barChildren: children,
                project: "",
                project_id: jProject.id,
                category: type,
              });
            }
          });

          response[3].forEach((task) => {
            if (task.name !== type) {
              tick++;
              addTask({
                seq: tick,
                name: task.name,
                start: new Date(),
                end: new Date(),
                type: "task",
                progress: 0,
                dependencies: [],
                hideChildren: false,
                barChildren: [],
                project: type,
                project_id: jProject.id,
                category: type,
              });
            }
          });
        }

        let data = allMaterials(jProject.location);

        Promise.all([data])
          .then((response2) => {
            setMaterials(response2[0]);

            let bigQ = allQuote(jProject.id);
            Promise.all([bigQ])
              .then((response3) => {
                setQuote(response3[0]);

                let total = quoteTotal(jProject.id);

                Promise.all([total])
                  .then((response) => {
                    setQuoteCosts(response[0].sum);
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
  };

  return (
    <div style={{ width: "300px" }}>
      <h3 style={{ marginLeft: 7 }}>Available Options</h3>
      <>
        {matTypes &&
          matTypes.map((work) => {
            return (
              <Accordion
                sx={{
                  borderRadius: "15px",
                  border: "1px",
                  backgroundColor: "#3B747D",
                  color: "white",
                  marginBottom: '10px',
                  boxShadow: "0px 5px 8px -1px #000000"
                }}
                expanded={expanded === work.type}
                onChange={handleChange(work.type)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>{work.type}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    borderRadius: "0 0 15px 15px",
                    backgroundColor: "#F3F4F6",
                    color: "#102E4A",
                  }}
                >
                  <Typography>
                    {materials &&
                      materials.map((material) => {
                        if (material.type === work.type) {
                          return (
                            <ListItem
                              className="lister"
                              onClick={() =>
                                twoX(
                                  material.name,
                                  material.price,
                                  material.type
                                )
                              }
                              key={material.id}
                            >
                              <div className="materailListItem">
                                <div>{material.name}</div>
                                <div>${material.price}</div>
                              </div>
                            </ListItem>
                          );
                        }
                      })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </>
    </div>
  );
}
