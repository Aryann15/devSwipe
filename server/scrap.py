import requests
import base64

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

if repo_response.status_code == 200:
    repos = repo_response.json()[:25]  # Get the first 25 repositories
    for repo in repos:
        repo_name = repo['name']
        repo_description = repo['description']
        repo_fork = repo['fork']
        print(f"Repository Name: {repo_name}")
        print(f"Description: {repo_description}")
        print(f"Fork: {repo_fork}")
else:
    print(f"Failed to fetch repositories. Status code: {repo_response.status_code}")


org_api_url = f"https://api.github.com/users/{username}/orgs"
org_response = requests.get(org_api_url)

if org_response.status_code == 200:
    orgs_data = org_response.json()
    for org in orgs_data:
        print(f"Organization Name: {org['login']}")
else:
    print(f"Failed to fetch organizations. Status code: {org_response.status_code}")


readme_api_url = f"https://api.github.com/repos/{username}/{username}/readme"
readme_response = requests.get(readme_api_url)

if readme_response.status_code == 200:
    readme_data = readme_response.json()
    readme_content = base64.b64decode(readme_data["content"]).decode("utf-8")
    print("README.md Content:")
    print(readme_content)
else:
    print(f"Failed to fetch README.md. Status code: {readme_response.status_code}")
