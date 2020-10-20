from numpy.lib.function_base import insert
import requests
import json
import os
import time
import pandas as pd

# CLIENT_ID = os.environ["CLIENT_ID"]
# CLIENT_SECRET = os.environ["CLIENT_SECRET"]





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

df = pd.read_csv("complete/p1.csv") # Change this to p3/p4


# print(auth_response_data)

i = 1
    
song_id = "0VjIjW4GlUZAMYd2vXMi3b"

media = requests.get("https://api.spotify.com/v1/tracks/{id}".format(id = song_id), headers=headers).json()
meta = requests.get("https://api.spotify.com/v1/audio-features/{id}".format(id = song_id), headers=headers).json()

print(media["artists"][0]["name"])


# media = requests.get("https://api.spotify.com/v1/tracks/{id}".format(id = "3Z1kZKYfRC8iRXnYeC5sCJ"), headers=headers).json()
# meta = requests.get("https://api.spotify.com/v1/audio-features/{id}".format(id = "3Z1kZKYfRC8iRXnYeC5sCJ"), headers=headers).json()

# preview_url = media["preview_url"]
# image = media["album"]["images"][0]["url"]
# artist = media["artists"][0]["name"]
