import pandas as pd
import numpy as np
from scripts import spotify_api
import random

def send_results():
    """
    selects 10 songs at random to show at the search page
    """
    
    df = pd.read_csv("scripts/meta/song_meta.csv")
    randomlist = []
    for i in range(10):
        n = random.randint(0, 40000)
        randomlist.append(n)
    
    random_songs = []

    for i in randomlist:
        song_name = df.iloc[int(i), 1]
        artist_name = df.iloc[int(i), 2]
        spotify_id = df.iloc[int(i), 3]
        image_url, prev_url = spotify_api.get_urls(str(spotify_id))
        temp_dict = {
            "song_name": song_name,
            "artist_name": artist_name,
            "spotify_id": spotify_id,
            "image_url": image_url,
            "preview": prev_url
        }
        random_songs.append(temp_dict)
    return random_songs

