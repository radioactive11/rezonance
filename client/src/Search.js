import React,{useState} from 'react';
import './App.css';
import axios from "axios"
import {Redirect,useHistory} from "react-router-dom"
import { useEffect } from 'react';

const Search = () => {
  const [search,setSearch] = useState("");
  const [result,setResult] = useState([]);
  const [random,setRandom] = useState([]);

  const localUrl = "http://localhost:5000/"
  const publicUrl = "https://rezonance-radioactive11.herokuapp.com/"

  const history = useHistory();

  useEffect(() => {
    axios.get(publicUrl+"random")
    .then((res) => {
        console.log(res.data,"data");
        setRandom(res.data);
    })
  },[])

  const getResults = (e) => {
    
    setSearch(e.target.value);
    console.log(e.target.value);

    if((e.target.value).length >=4 && ((e.target.value).length) !== 0) {

        //http://cors-anywhere.herokuapp.com/https://rezonance-radioactive11.herokuapp.com/search
      axios.post(publicUrl+"search",{
        search_param : e.target.value
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
    
  console.log(result,"result",random,"random");
  
  return (
    <div className="main">
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
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12"  key ={songs.spotify_id}>
        
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
        ) : (
            <h1 className = "text"> loading </h1>
        )}
        </div>
  )

        }

export default Search;
