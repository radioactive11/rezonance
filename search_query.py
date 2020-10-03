import pandas as pd


def query(param):
    ids = pd.read_csv("data/id2.csv")
    mask = ids["search"].str.contains(param, regex=False, case=False)
    df_results = ids[mask]

    search_results = []
    
    ctr = 0
    for i in range(len(df_results)):
        if ctr == 100:
            break
        song_id = df_results.iloc[i, 0]
        song_name = df_results.iloc[i, 1]
        song_artist = df_results.iloc[i, 2]
        spotify_id = df_results.iloc[i, 3]
        temp_dict = {
            "song": song_name,
            "artist": song_artist,
            "id": str(song_id),
            "spotify_id": str(spotify_id)
        }
        if song_id <= 50000:
            search_results.append(temp_dict)
            ctr += 1
    return search_results
