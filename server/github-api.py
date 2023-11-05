import requests
import base64
import json
from flask import request
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from dotenv import load_dotenv
import os
from langchain import OpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain import PromptTemplate

app = Flask(__name__)
CORS(app)


username = None


data = ""


@app.route("/gitrev", methods=["POST"])
def git_review():
    openai_api_key = os.environ.get("OPENAI_API_KEY")
    username = request.args.get("username")
    return username

with app.test_request_context():
    username = git_review()

if username :
    def github_data(username):
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


        return user_data_string


    def summarized_rev(user_data_string):
        text_splitter = RecursiveCharacterTextSplitter(separators=[" "], chunk_size=6000, chunk_overlap=500)
        docs = text_splitter.create_documents([user_data_string])
        llm = OpenAI(temperature=0, openai_api_key=openai_api_key)
        if docs:
            summary_chain = load_summarize_chain(llm=llm, chain_type='map_reduce',
                                      verbose=True)

            combine_prompt = """
            You are world class develeoper Reviewer. Look at the github profile and extract all the important details about him 
            USE BULLET POINTS FOR EACH INFORMATION
            ALSO RATE THE INDIVIDUAL WITH A SMALL SUMMARY AT LAST

            {text}
            """

            combine_prompt_template = PromptTemplate(template=combine_prompt, input_variables=["text"])
            summary_chain = load_summarize_chain(llm=llm,
                                     chain_type='map_reduce',
                                     combine_prompt=combine_prompt_template,
                                    verbose=True
                                    )

            output = summary_chain.run(docs)

            with open(f"{username}_github_review.txt", "w") as text_file:
                text_file.write(output)


if __name__ == "__main__":
    app.run(debug=True)
