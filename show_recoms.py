import numpy as np
import pandas as pd


def generate_recoms(idx):
    cosine_sim = np.load("data/sim.npy")
    idx = int(idx)
    sim_scores = list(enumerate(cosine_sim[idx]))
    # Sort the songs based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    id = pd.read_csv("data/id.csv")
    # Get the scores of the 10 most similar songs
    sim_scores = sim_scores[1:11]
    sim_scores.sort()
    # Get the song indices
    song_index = [i[0] for i in sim_scores]
    song_index = song_index
    # Return the top 10 most similar songs
    song_names = []
    for i in song_index:
        song_names.append(id.iloc[i, 1] + " by " + id.iloc[i, 2])

    current_song = id.iloc[idx, 1] + " by " + id.iloc[idx, 2]
    return song_names, current_song
