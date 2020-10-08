import numpy as np
import pandas as pd
from scripts import spotify_api

def generate_recoms(idx):
    """
    fetches recommendations for given song (id)
    """
    idx = int(idx)

    # light.npy is pre-saved recommendations for all songs to optimize time
    sim = np.load("data/light.npy")
    
    df = pd.read_csv("data/id2.csv")
    recoms_list = sim[idx, :]
    recommendation = []
    for i in range(0, 10):
        song_name = df.iloc[int(recoms_list[i]), 1]
        artist_name = df.iloc[int(recoms_list[i]), 2]
        spotify_id = df.iloc[int(recoms_list[i]), 3]
        image_url, prev_url = spotify_api.get_urls(str(spotify_id))
        temp_dict = {
            "song_name": song_name,
            "artist_name": artist_name,
            "spotify_id": spotify_id,
            "image_url": image_url,
            "preview": prev_url
        }
        recommendation.append(temp_dict)
    return recommendation

