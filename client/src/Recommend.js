import React, { useEffect, useState } from "react";
import Axios from "axios";

const Recommend = props => {
  const [result,setResult] = useState([]);
  
  useEffect(() => {
    Axios.post("https://rezonance-radioactive11.herokuapp.com/recommend", {
      id: props.location.state.id
    }).then(res => {
	//   res.data.map((elem) => elem.isPlaying = false);
      setResult(res.data);
      console.log(res.data, "result");
    });
  }, []);

  //Final

  let currentAudio = new Audio();
  let isPlaying = false;
  let audio = new Audio();
  
   const playSong = (preview, id,index) => {

	audio.src = preview;

	if(!isPlaying)
	{
		isPlaying = true;
		audio.play();
		currentAudio.src = audio.src;
	}
	else
	{
		if(currentAudio.src === audio.src)
		{
			audio.pause();
			isPlaying = false;
		}
		else
		{
			audio.play()
			currentAudio.src = audio.src;
			isPlaying = true;
		}
	}
	
  };

  //bhai server restart krde
  return (
    <div>
      {result && (
        <div className="container">
          <div className="row">
            {result.map((songs,index) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-sm-12"
                key={songs.spotify_id}
              >
                <div className="profile-card-2">
                  <img
                    src={songs.image_url}
                    // src = "https://i.scdn.co/image/ab67616d0000b2731cbd0d5849b51c79c99e7b87"
                    className="img img-responsive"
                    onClick={() => playSong(songs.preview, songs.spotify_id,index)}
                  />
				  
                  <div className="profile-name">{songs.song_name}</div>
                  <div className="profile-username">{songs.artist_name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommend;
