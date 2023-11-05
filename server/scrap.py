import requests

username = "Saransh-cpp"


# api_url = f'https://api.github.com/users/{username}'

# response = requests.get(api_url)
# if response.status_code == 200:
#     user_data = response.json()
#     print(f"User Profile for {username}:")
#     print(f"Name: {user_data['name']}")
#     print(f"Bio: {user_data['bio']}")
#     print(f"Followers: {user_data['followers']}")
#     print(f"Following: {user_data['following']}")
# else:
#     print("Failed to fetch")



# repo_api_url = f'https://api.github.com/users/{username}/repos'

# params = {
#     'sort': 'created',
#     'direction': 'desc'
# }
# repo_response = requests.get(repo_api_url, params=params)

# if repo_response.status_code == 200:
#     repos = repo_response.json()[:25]  # Get the first 25 repositories
#     for repo in repos:
#         repo_name = repo['name']
#         repo_description = repo['description']
#         repo_fork = repo['fork']
#         print(f"Repository Name: {repo_name}")
#         print(f"Description: {repo_description}")
#         print(f"Fork: {repo_fork}")
# else:
#     print(f"Failed to fetch repositories. Status code: {repo_response.status_code}")


org_api_url = f'https://api.github.com/users/{username}/orgs'
org_response = requests.get(org_api_url)

if org_response.status_code == 200:
    orgs_data = org_response.json()
    for org in orgs_data:
        print(f"Organization Name: {org['login']}")
else:
    print(f"Failed to fetch organizations. Status code: {org_response.status_code}")