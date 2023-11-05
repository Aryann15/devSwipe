import requests
import base64
import json

username = "Saransh-cpp"


api_url = f'https://api.github.com/users/{username}'

response = requests.get(api_url)
user_profile = {}
if response.status_code == 200:
    user_data = response.json()
    user_profile["name"] = user_data.get("name", "")
    user_profile["bio"] = user_data.get("bio", "")
    user_profile["followers"] = user_data.get("followers", 0)
    user_profile["following"] = user_data.get("following", 0)
else:
    print("Failed to fetch user profile.")


repo_api_url = f'https://api.github.com/users/{username}/repos'

params = {
    'sort': 'created',
    'direction': 'desc'
}
repo_response = requests.get(repo_api_url, params=params)
user_repositories = []
if repo_response.status_code == 200:
    repos = repo_response.json()[:25]  # Get the first 25 repositories
    for repo in repos:
        repo_data = {
            "name": repo['name'],
            "description": repo['description'],
            "fork": repo['fork']
        }
        user_repositories.append(repo_data)
else:
    print(f"Failed to fetch repositories. Status code: {repo_response.status_code}")


org_api_url = f"https://api.github.com/users/{username}/orgs"
org_response = requests.get(org_api_url)

user_organizations = []
if org_response.status_code == 200:
    orgs_data = org_response.json()
    for org in orgs_data:
        user_organizations.append(org['login'])
else:
    print(f"Failed to fetch organizations. Status code: {org_response.status_code}")


readme_api_url = f"https://api.github.com/repos/{username}/{username}/readme"
readme_response = requests.get(readme_api_url)

if readme_response.status_code == 200:
    readme_data = readme_response.json()
    readme_content = base64.b64decode(readme_data["content"]).decode("utf-8")
else:
    print(f"Failed to fetch README.md. Status code: {readme_response.status_code}")


user_data_dict = {
    "user_profile": user_profile,
    "user_repositories": user_repositories,
    "user_organizations": user_organizations,
    "user_readme": readme_content
}

with open(f"{username}_github_data.json", "w") as json_file:
    json.dump(user_data_dict, json_file, indent=4)

print(f"User data has been saved to {username}_github_data.json.")