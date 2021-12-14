
import './App.css';
import axios from 'axios';
import { React, useEffect } from 'react';
import LoginPage from './components/loginPage';

function App() {

  useEffect(() => {
    return axios.get("http://localhost:5000/users")
    .then(response => {
        console.log("users:", response.data)
    })
  }, [])

  useEffect(() => {
    return axios.get("http://localhost:5000/projects")
    .then(response => {
        console.log("projects:", response.data)
    })
  }, [])

  return (
    <div>
       <LoginPage/>
    </div>
  );
}

export default App;
