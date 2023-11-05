import requests
import base64
import json

username = "Saransh-cpp"


api_url = f'https://api.github.com/users/{username}'

response = requests.get(api_url)
user_profile = ""
if response.status_code == 200:
    user_data = response.json()
    user_profile += f"User Profile for {username}:\n"
    user_profile += f"Name: {user_data.get('name', '')}\n"
    user_profile += f"Bio: {user_data.get('bio', '')}\n"
    user_profile += f"Followers: {user_data.get('followers', 0)}\n"
    user_profile += f"Following: {user_data.get('following', 0)}\n\n"
else:
    print("Failed to fetch user profile.")


repo_api_url = f'https://api.github.com/users/{username}/repos'

params = {
    'sort': 'created',
    'direction': 'desc'
}
repo_response = requests.get(repo_api_url, params=params)
user_repositories = ""
if repo_response.status_code == 200:
    repos = repo_response.json()[:25]  # Get the first 25 repositories
    for repo in repos:
        user_repositories += f"Repository Name: {repo['name']}\n"
        user_repositories += f"Description: {repo['description']}\n"
        user_repositories += f"Fork: {repo['fork']}\n\n"
else:
    print(f"Failed to fetch repositories. Status code: {repo_response.status_code}")


org_api_url = f"https://api.github.com/users/{username}/orgs"
org_response = requests.get(org_api_url)

user_organizations = ""
if org_response.status_code == 200:
    orgs_data = org_response.json()
    user_organizations += "User Organizations:\n"
    for org in orgs_data:
        user_organizations += f"Organization Name: {org['login']}\n"
else:
    print(f"Failed to fetch organizations. Status code: {org_response.status_code}")


readme_api_url = f"https://api.github.com/repos/{username}/{username}/readme"
readme_response = requests.get(readme_api_url)
user_readme = ""
if readme_response.status_code == 200:
    readme_data = readme_response.json()
    readme_content = "README.md Content:\n"
    readme_content += base64.b64decode(readme_data["content"]).decode("utf-8") + "\n"
    readme_content = readme_content.replace("\n\n", " ")  
    readme_content = readme_content.replace("     ", " ")  
    readme_content = readme_content.replace("\n", " ")
else:
    print(f"Failed to fetch README.md. Status code: {readme_response.status_code}")

user_data_string = user_profile + user_repositories + user_organizations + readme_content

with open(f"{username}_github_data.txt", "w") as text_file:
    text_file.write(user_data_string)

print(f"User data has been saved to {username}_github_data.json.")