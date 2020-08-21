import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


df = pd.read_csv("song_artist.csv")
song_id = df[["id", "name", "artists"]]
data = df.drop(["id", "name", "artists", "acousticness", "danceability"], axis = 1).copy()
meta = data.values
meta = meta[:40000, :]

cosine_sim = cosine_similarity(meta, meta)

print("saving matrix...")
np.save("data/sim.npy", cosine_sim)