import requests
import json
import os

CLIENT_ID = os.environ["CLIENT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]

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

BASE_URL = 'https://api.spotify.com/v1/'

track_id = "34MJ07N9Bhu6iKPaxSVnCT"
res = requests.get("https://api.spotify.com/v1/tracks/?ids={id}".format(id = track_id), headers=headers).json()


print(res["tracks"][0]["preview_url"])