
import './App.css';
import { React, useState} from 'react';
import LoginPage from './components/loginPage';
import ProjectsPage from './components/projectsPage';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './components/userContext';

function App() {

  const [user, setUser] = useState('')


  return (
    <div>
       <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route 
          path ="/" 
          element={<LoginPage/>}
          />
        <Route 
          path ="/projects" 
          element={<ProjectsPage/>}
          />
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
