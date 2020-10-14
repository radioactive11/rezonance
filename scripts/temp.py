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


main_df = pd.DataFrame(columns=["name", "spotify_id", "popularity"])

print("Token: ", access_token)

res = requests.get("https://api.spotify.com/v1/tracks/{q}".format(q = "abcd"), headers=headers).json()