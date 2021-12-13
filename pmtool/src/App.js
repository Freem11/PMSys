
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    return axios.get("http://localhost:5000/users")
    .then(response => {
        console.log("hmmm?", response.data)
    })
  }, [])

  return (
    <div className="App">
        <p>arrghhh</p>
    </div>
  );
}

export default App;
