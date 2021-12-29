import { useContext, useState } from 'react'
import { UserContext } from './userContext'
import { ProjectContext } from './projectContext'
import { QuoteContext, QuoteCostContext} from './materialComponents/quoteContext'
import { useNavigate } from "react-router-dom";
import CustomizedAccordions from './materialComponents/accordion'
import QuoteList from './materialComponents/quotelist'
import "./quotesPage.scss"; 

const QuotesPage = () => {

    let navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { project } = useContext(ProjectContext);
    const [ quote, setQuote ] = useState('');
    const [ quoteCosts, setQuoteCosts ] = useState('');

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
        <QuoteCostContext.Provider value={{quoteCosts, setQuoteCosts}}>
        <div>
          <h2>Quotes: </h2>
            <div className="quoteBox">
              <CustomizedAccordions/>
              <QuoteList/>
            </div>
        </div>
        </QuoteCostContext.Provider>
      </QuoteContext.Provider>
    )

}

export default QuotesPage;