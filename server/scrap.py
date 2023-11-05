import requests

username = "Saransh-cpp"


api_url = f'https://api.github.com/users/{username}'

response = requests.get(api_url)
if response.status_code == 200:
    user_data = response.json()
    print(f"User Profile for {username}:")
    print(f"Name: {user_data['name']}")
    print(f"Bio: {user_data['bio']}")
else:
    print("Failed to fetch")