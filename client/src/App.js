import React,{useState} from 'react';
import './App.css';
import axios from "axios"

const App = () => {
  const [search,setSearch] = useState("");
  const [result,setResult] = useState({});

  const getResults = (e) => {
    
    setSearch(e.target.value);
    console.log(e.target.value);

    if((e.target.value).length %3 === 0 && ((e.target.value).length) !== 0) {

      axios.post("http://localhost:5000/search",{
        search_param : e.target.value
      })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
    }
    
  }

  return (
    <div>
      
      <input 
        type ="text" 
        name = "search"
        value = {search}
        onChange = {(e) => getResults(e)}
      />
      {/* <button type = "submit" onClick = {(e) => output(e)} > submit </button> */}
      <p>{JSON.stringify(result)}</p>
    </div>

  )
  
}

export default App;
