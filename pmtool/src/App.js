
import './App.css';
import axios from 'axios';
import { React, useEffect, useState} from 'react';
import LoginPage from './components/loginPage';
import ProjectsPage from './components/projectsPage';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './components/userContext';

function App() {

  const [user, setUser] = useState('')

  useEffect(() => {
    return axios.get("http://localhost:5000/projects")
    .then(response => {
        console.log("projects:", response.data)
    })
  }, [])

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
