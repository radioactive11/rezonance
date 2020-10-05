import requests
import json

CLIENT_ID = "50179b9e0a064ad09ffb159682151c22"
CLIENT_SECRET = "acd7f54eea1e4e70a6f35f7afbaee6cb"


try:
    AUTH_URL = "https://accounts.spotify.com/api/token"

    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })

    auth_response_data = auth_response.json()
except Exception as e:
    print("error in auth")
    print(e)

# save the access token

try:
    access_token = auth_response_data['access_token']

    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }


    BASE_URL = 'https://api.spotify.com/v1/'
except Exception as e:
    print("error getting access token")
    print(e)


def get_urls(track_id):
    # Track ID from the URI
        
        # actual GET request with proper header
        res = requests.get("https://api.spotify.com/v1/tracks/?ids={id}".format(id = track_id), headers=headers).json()
        print(res)
        # r_image = r["album"]["images"]

        try:
            img_url = str(res["tracks"][0]["album"]["images"][0]["url"])
        except:
            img_url = "error getting image"

        try:
            prev_url = str(res["tracks"][0]["preview_url"])
        except Exception as e:
            prev_url = "error getting preview"
            print(e)
            
        return img_url, prev_url
        

