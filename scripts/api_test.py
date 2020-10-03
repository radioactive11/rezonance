import requests
import json

CLIENT_ID = "50179b9e0a064ad09ffb159682151c22"
CLIENT_SECRET = "69fcf3ce25af45229ce6f95a84ac9971"

AUTH_URL = "https://accounts.spotify.com/api/token"

auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
})

# convert the response to JSON
auth_response_data = auth_response.json()

# save the access token
access_token = auth_response_data['access_token']

headers = {
    'Authorization': 'Bearer {token}'.format(token=access_token)
}



BASE_URL = 'https://api.spotify.com/v1/'

# Track ID from the URI
track_id = '5d2Kn9oAAh9S2EbyCo1i52'

# actual GET request with proper header
r = requests.get("https://api.spotify.com/v1/tracks/{id}".format(id = track_id), headers=headers).json()["album"]["images"]


print(r[0]['url'])
