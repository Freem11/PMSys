
import './App.css';
import { React, useState} from 'react';
import LoginPage from './components/loginPage';
import ProjectsPage from './components/projectsPage';
import Drawer from './components/drawer'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './components/userContext';
import { ProjectContext } from './components/projectContext'

function App() {

  const [user, setUser] = useState('')
  const [project, setProject] = useState('')

  return (
    <div>
       <UserContext.Provider value={{user, setUser}}>
       <ProjectContext.Provider value={{project, setProject}}>
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
      </ProjectContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
