import React,{useState} from 'react';
import './App.css';
import axios from "axios"

const App = () => {
  const [search,setSearch] = useState("");
  const [result,setResult] = useState({});

  const output = (e) => {
    e.preventDefault();
    
    axios.post("https://rezonance-radioactive11.herokuapp.com/search",{
      search_param : search
    })
    .then((res) => {
      console.log(res.data);
      setResult(res.data);
    })
  }

  return (
    <div>
      
      <input 
        type ="text" 
        name = "search"
        value = {search}
        onChange = {(e) => setSearch(e.target.value)}
      />
      <button type = "submit" onClick = {(e) => output(e)} > submit </button>
      <p>{JSON.stringify(result)}</p>
    </div>

  )
  
}

export default App;
