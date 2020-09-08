import numpy as np


def get_recommendations(idx, cosine_sim):
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the songs based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar songs
    sim_scores = sim_scores[1:11]
    sim_scores.sort()
    # Get the song indices
    song_index = [i[0] for i in sim_scores]
    song_index = song_index
    # Return the top 10 most similar songs
    return song_index

# sim = np.load("../data/sim.npy")


def trial(idx):
    arr = np.load("light.npy")
    print(type(arr[idx, 0]))

# print(get_recommendations(1, sim))
trial(1)

