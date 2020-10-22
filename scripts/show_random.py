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
        n = random.randint(0, 50000)
        randomlist.append(n)
    
    random_songs = []

    for i in randomlist:
        song_name = df.iloc[i, 0]
        artist_name = df.iloc[i, 1]
        spotify_id = df.iloc[i, 2]
        preview = df.iloc[i, 3]
        if preview == 'not_avail':
            preview = ""
        img = df.iloc[i, 4]
        # print(song_name, " by ", artist_name)
        temp_dict = {
            "song_name": song_name,
            "artist_name": artist_name,
            "spotify_id": spotify_id,
            "image_url": img,
            "preview": preview
        }
        random_songs.append(temp_dict)
    return random_songs

