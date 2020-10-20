import pandas as pd
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


sim = np.load("../data/sim.npy")
all_res = np.zeros((1, 10))

for i in range(0, 40000):
    rec_list = get_recommendations(i, sim)
    rec_array = np.array(rec_list)
    rec_array = rec_array.reshape((1, 10))
    rec_array = rec_array.astype(int)
    all_res = np.append(all_res, rec_array, axis=0)
    print("saved for:" + str(i))

all_res = np.delete(all_res, 0, axis=0)
np.save("light.npy", all_res)

