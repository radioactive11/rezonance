import numpy as np
import pandas as pd


def generate_recoms(idx):
    idx = int(idx)
    sim = np.load("data/light.npy")
    df = pd.read_csv("data/song_artist.csv")
    recoms_list = sim[idx, :]
    recommendation = []
    for i in range(0, 10):
        song_name = df.iloc[int(recoms_list[i]), 1]
        artist_name = df.iloc[int(recoms_list[i]), 2]
        temp_dict = {
            "song_name": song_name,
            "artist_name": artist_name
        }
        recommendation.append(temp_dict)
    return recommendation

