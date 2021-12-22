

import { React, useState} from 'react';
import LoginPage from './components/loginPage';
import ProjectsPage from './components/projectsPage';
import Drawer from './components/drawer'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './components/userContext';
import { ProjectContext } from './components/projectContext'
import { ProjectsContext } from './components/projectsContext'

function App() {

  const [user, setUser] = useState('')
  const [project, setProject] = useState([])
  const [projects, setProjects] = useState([])

  return (
    <div>
       <UserContext.Provider value={{user, setUser}}>
       <ProjectContext.Provider value={{project, setProject}}>
       <ProjectsContext.Provider value={{projects, setProjects}}>
      <Routes>
        <Route 
          path ="/" 
          element={<LoginPage/>}
          />
        <Route 
          path ="/projects" 
          element={<ProjectsPage/>}
          />
        <Route 
          path ="/project" 
          element={<Drawer/>}
          />
      </Routes>
      </ProjectsContext.Provider>
      </ProjectContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
