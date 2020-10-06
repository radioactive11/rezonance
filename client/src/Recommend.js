import React,{useEffect,useState} from "react"
import Axios from "axios";

const Recommend = (props) => {
    
    const [result,setResult] = useState([]);

    useEffect(() => {
        Axios.post("https://rezonance-radioactive11.herokuapp.com/recommend",{
            id : props.location.state.id
        })
        .then((res) => {
            setResult(res.data); 
            console.log(res.data,"result");
        })
    })

	

    //Final 
    var audio = new Audio();
    var audios = [];
    audios.push(audio);
    var ctr = 88;
    var ctrarr = [];
    ctrarr.push(ctr);

    function playSong (preview)
    {
      console.log(audios.length);
      if(! audios[0].paused)
      {
        console.log("in if", ctrarr[0])
        ctrarr[0]++;
        audios[0].pause();
        audios[0].src = preview;
        audios[0].play();
      }
      else{
        console.log("in else", ctrarr[0])
        // audios[0].pause();
        audios[0].src = preview;
        audios[0].play();
      }
    }


    // const playSong = (preview,id) => {
    //     let audio = new Audio(preview);
	// 	audio.load();
	// 	audio.play();
    //     console.log(id,"id of current song");

    //     audios = audios.push({
    //         name : audio,
    //         id
    //     });

    //     console.log(audios,"array");

    //     for(let i=0;i<audios.length;i++) {
    //         if(audios[i].id === id) {
    //             console.log(id,"id");
    //             audios[i].name.load();
    //             audios[i].name.play();
    //         }
    //         else {
    //             console.log(id,"id from else");
    //             audios[i].name.pause();
    //         }
    //     }
    // }
    
    return (
        <div>
            {result && (     
          <div className="container">
          <div className="row">

          {result.map((songs) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-sm-12" key ={songs.spotify_id}>

              <div className="profile-card-2">
                <img 
                  src={songs.image_url}
                  // src = "https://i.scdn.co/image/ab67616d0000b2731cbd0d5849b51c79c99e7b87" 
                  className="img img-responsive" onClick = {() => playSong(songs.preview)} />

                  <div className="profile-name">{songs.song_name}</div>
                  <div className="profile-username">{songs.artist_name}</div>
              </div>
          
            </div>
          ))}

          </div>
        </div> 
      )}    
        </div>
    )
}

export default Recommend