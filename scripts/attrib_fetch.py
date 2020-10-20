from numpy.lib.function_base import insert
import requests
import json
import os
import time
import pandas as pd

# CLIENT_ID = os.environ["CLIENT_ID"]
# CLIENT_SECRET = os.environ["CLIENT_SECRET"]


CLIENT_ID = "50179b9e0a064ad09ffb159682151c22"
CLIENT_SECRET = "839cf55128424188bdae3d1083921ecf"


AUTH_URL = "https://accounts.spotify.com/api/token"

auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
})

auth_response_data = auth_response.json()


# save the access token
access_token = auth_response_data['access_token']

headers = {
    'Authorization': 'Bearer {token}'.format(token=access_token)
}

df = pd.read_csv("songs4.csv") # Change this to p3/p4



for i in range(0, 5000):
    try:
        song_id = df.iloc[i, 1]

        media = requests.get("https://api.spotify.com/v1/tracks/{id}".format(id = song_id), headers=headers).json()
        meta = requests.get("https://api.spotify.com/v1/audio-features/{id}".format(id = song_id), headers=headers).json()

        df.iloc[i, 3] = media["artists"][0]["name"] # artist
        df.iloc[i, 4] = meta["danceability"] # danceability
        df.iloc[i, 5] = meta["energy"] # energy
        df.iloc[i, 6] = meta["loudness"] # loudness
        df.iloc[i, 7] = meta["mode"] # mode
        df.iloc[i, 8] = meta["speechiness"] # speechiness
        df.iloc[i, 9] = meta["acousticness"] # acousticness
        df.iloc[i, 10] = meta["instrumentalness"] # instrumentalness
        df.iloc[i, 11] = meta["liveness"] # liveness
        df.iloc[i, 12] = meta["valence"] # valence
        df.iloc[i, 13] = media["preview_url"] # image
        df.iloc[i, 14] = media["album"]["images"][0]["url"]

        if i%100 == 0:
            df.to_csv("songs4.csv", index=False) # change this to songs3/songs4 .csv
            print("Current song: ", str(df.iloc[i, 0]))
            print("saving")
            time.sleep(5)


    except Exception as e:
        print(e)
        print("error at ", str(df.iloc[i, 0]))
        df.to_csv("songs4.csv", index=False) # change this to songs3/songs4 .csv
        print(i)
        continue


df.to_csv("songs4.csv", index=False) # change this to songs3/songs4 .csv


# media = requests.get("https://api.spotify.com/v1/tracks/{id}".format(id = "3Z1kZKYfRC8iRXnYeC5sCJ"), headers=headers).json()
# meta = requests.get("https://api.spotify.com/v1/audio-features/{id}".format(id = "3Z1kZKYfRC8iRXnYeC5sCJ"), headers=headers).json()

# preview_url = media["preview_url"]
# image = media["album"]["images"][0]["url"]
# artist = media["artists"][0]["name"]
