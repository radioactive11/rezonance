import pandas as pd
from scripts import spotify_api

def query(param):
    """
    param: input provided by user to search song/artist
    """
    ids = pd.read_csv("data/id2.csv")

    # mask: boolean mask to search, disabled regex to search for chars like ', ", ", / etc.
    mask = ids["search"].str.contains(param, regex=False, case=False)
    df_results = ids[mask]

    search_results = []
    
    #result counter to keep track of number of results, limiting to 10
    ctr = 0
    for i in range(len(df_results)):
        if ctr == 10:
            break
        song_id = df_results.iloc[i, 0]
        song_name = df_results.iloc[i, 1]
        song_artist = df_results.iloc[i, 2]
        spotify_id = df_results.iloc[i, 3]
        image_url, prev_url = spotify_api.get_urls(str(spotify_id))
        temp_dict = {
            "song": song_name,
            "artist": song_artist,
            "id": str(song_id),
            "spotify_id": str(spotify_id),
            "image_url": image_url,
            "prev": prev_url
        }
        if song_id <= 50000:
            search_results.append(temp_dict)
            ctr += 1
    return search_results
