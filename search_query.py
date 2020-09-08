import pandas as pd


def query(param):
    ids = pd.read_csv("data/id.csv")
    mask = ids["search"].str.contains(param, regex=False, case=False)
    df_results = ids[mask]
    search_results = []
    for i in range(len(df_results)):
        song_id = df_results.iloc[i, 0]
        song_name = df_results.iloc[i, 1]
        song_artist = df_results.iloc[i, 2]
        temp_dict = {
            "song": song_name,
            "artist": song_artist,
            "id": str(song_id)
        }
        search_results.append(temp_dict)
    return search_results
