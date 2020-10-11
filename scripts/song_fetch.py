import requests
import json
import os
import pandas as pd

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]


# CLIENT_ID = "50179b9e0a064ad09ffb159682151c22"
# CLIENT_SECRET = "839cf55128424188bdae3d1083921ecf"


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

BASE_URL = 'https://api.spotify.com/v1/search'

track_id = "type=track&q=year:2020&limit=5&offset=1"
res = requests.get("https://api.spotify.com/v1/search?{q}".format(q = track_id), headers=headers).json()



# print(res['tracks']['items'][1]['name'])

list_dicts = []

for i, item in enumerate(res['tracks']['items']):
    temp_dict = {
        "name": item['name'],
        "spotify_id": item['id'],
        "popularity": item['popularity']
    }
    list_dicts.append(temp_dict)

df = pd.DataFrame(list_dicts)

df.to_csv("test.csv")
