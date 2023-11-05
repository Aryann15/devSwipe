import requests

username = "Saransh-cpp"


api_url = f'https://api.github.com/users/{username}'

response = requests.get(api_url)
if response.status_code == 200:
    user_data = response.json()
    print("succes")
else:
    print("Failed to fetch")