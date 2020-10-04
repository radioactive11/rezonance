import React,{useState} from 'react';
import './App.css';
import axios from "axios"

const App = () => {
  const [search,setSearch] = useState("");
  const [result,setResult] = useState([]);

  const getResults = (e) => {
    
    setSearch(e.target.value);
    console.log(e.target.value);

    if((e.target.value).length %3 === 0 && ((e.target.value).length) !== 0) {

      axios.post("http://localhost:5000/search",{
        search_param : e.target.value
      })
      .then((res) => {
        console.log(res.data.search_results);
        setResult(res.data.search_results);
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
    
      {result && (     
          <div className="container">
          <div className="row">

          {result.map((songs) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-sm-12">
        
              <div className="profile-card-2">
                <img 
                  src={songs.image_url}
                  // src = "https://i.scdn.co/image/ab67616d0000b2731cbd0d5849b51c79c99e7b87" 
                  className="img img-responsive" />
    
                  <div className="profile-name">{songs.song}</div>
                  <div className="profile-username">{songs.artist}</div>
              </div>
          
            </div>
          ))}

          </div>
        </div> 
      )}
     
    </div>

  )
}

export default App;
