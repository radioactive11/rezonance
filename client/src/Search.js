import React,{useState} from 'react';
import './App.css';
import axios from "axios"
import {Redirect,useHistory} from "react-router-dom"
import { useEffect } from 'react';

const Search = () => {
  const [search,setSearch] = useState("");
  const [result,setResult] = useState([]);
  const [random,setRandom] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:5000/random")
    .then((res) => {
        console.log(res.data,"data");
        setRandom(res.data);
    })
  },[])

  const getResults = (e) => {
    
    setSearch(e.target.value);
    console.log(e.target.value);

    if((e.target.value).length >= 4 && ((e.target.value).length) !== 0) {

        //http://cors-anywhere.herokuapp.com/https://rezonance-radioactive11.herokuapp.com/search
        axios.post("https://rezonance-radioactive11.herokuapp.com/search",{
          search_param : e.target.value
        },{
          headers: {
            "Content-Type": "application/json",
          },
              })
              
  
      .then((res) => {
        console.log(res.data.search_results);
        setResult(res.data.search_results);
      })
    }
    
  }

  const getId = (id) => { 
      console.log(id);
        history.push({
            pathname: '/recommend',
            state: { id }
      })
  }
    
  return (
    <div>
      <input 
        type ="text" 
        name = "search"
        value = {search}
        onChange = {(e) => getResults(e)}
      />
    
      {result ?  (     
          <div className="container">
          <div className="row">

          {result.map((songs) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        
              <div className="profile-card-2">
                <img 
                  src={songs.image_url}
                  // src = "https://i.scdn.co/image/ab67616d0000b2731cbd0d5849b51c79c99e7b87" 
                  className="img img-responsive" onClick={() => getId(songs.id) }/>
    
                  <div className="profile-name">{songs.song}</div>
                  <div className="profile-username">{songs.artist}</div>
              </div>
          
            </div>
            ))
          }

          </div>
        </div> 
        ) :(
          <div>
            {random ? (
                <div className="container">
            <div className="row">

            {random.map((songs) => (
                <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            
                <div className="profile-card-2">
                    <img 
                    src={songs.image_url}
                    // src = "https://i.scdn.co/image/ab67616d0000b2731cbd0d5849b51c79c99e7b87" 
                    className="img img-responsive" onClick={() => getId(songs.id) }/>
        
                    <div className="profile-name">{songs.song_name}</div>
                    <div className="profile-username">{songs.artist_name}</div>
                </div>
            
                </div>
            ))
            }

            </div>
            </div>
          ) 
          : (
              <h1> Loading random songs </h1>
          )}

          </div>
      )}

     
    </div>
  )
}


export default Search;
