import { useContext, useState, useEffect } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { QuoteContext } from './materialComponents/quoteContext'
import { useNavigate } from "react-router-dom";
import { getTeamByProjectId } from './AxiosFuncs/teamAxiosFuncs'
import { userById } from './AxiosFuncs/userAxiosFuncs'
import CustomizedAccordions from './materialComponents/accordion'
import QuoteList from './materialComponents/quotelist'

const QuotesPage = () => {

    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { project } = useContext(ProjectContext);
    const [ quote, setQuote ] = useState('');

    const userFromSession = window.sessionStorage.getItem("user")
  
    let jUser
    if (user[0]){
        jUser = JSON.parse(user)
    } else {
        jUser = JSON.parse(userFromSession)
    }

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
    
    return(
      <QuoteContext.Provider value={{quote, setQuote}}>
        <div>
          <h2>Quotes: </h2>
          <CustomizedAccordions/>
          <QuoteList/>
        </div>
      </QuoteContext.Provider>
    )

}

export default QuotesPage;