
import './App.css';
import axios from 'axios';
import { React, useEffect } from 'react';
import LoginPage from './components/loginPage';
import { Routes, Route } from 'react-router-dom';

function App() {

  useEffect(() => {
    return axios.get("http://localhost:5000/projects")
    .then(response => {
        console.log("projects:", response.data)
    })
  }, [])

  return (
    <div>
      <Routes>
        <Route 
          path ="/" 
          element={<LoginPage/>}
          />
      </Routes>
       
    </div>
  );
}

export default App;
