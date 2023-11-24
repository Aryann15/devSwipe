import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from prettytable import PrettyTable
import json


def preprocess_text(text):
    text = text.lower()
    text = "".join([char for char in text if char not in string.punctuation])
    tokens = text.split()
    return " ".join(tokens)


def load_recommendations(file_path="recommendation.json"):
    try:
        with open(file_path, "r") as file:
            recommendations = json.load(file)
        return recommendations
    except FileNotFoundError:
        print(f"File '{file_path}' not found. Please make sure the file exists.")
        return None
    except json.JSONDecodeError:
        print(f"Error decoding JSON in '{file_path}'. Please check the file format.")
        return None


def get_recommendations(user_id, df, weights):
    user_profile = df[df["id"] == user_id]

    if user_profile.empty:
        print(f"User with ID {user_id} not found.")
        return []

    user_profile_str = (
        weights["city"] * str(user_profile["city"].values[0])
        + weights["goals"] * str(user_profile["goals"].values[0])
        + weights["experience"] * str(user_profile["experience"].values[0])
        + weights["programmingLanguages"]
        * " ".join(user_profile["programmingLanguages"].values[0])
        + weights["skills"] * " ".join(user_profile["skills"].values[0])
        + weights["techFields"] * " ".join(user_profile["techFields"].values[0])
        + weights["profession"] * str(user_profile["profession"].values[0])
    )

    df["city"] = df["city"].apply(preprocess_text)
    df["goals"] = df["goals"].apply(preprocess_text)
    df["experience"] = df["experience"].apply(preprocess_text)
    df["programmingLanguages"] = df["programmingLanguages"].apply(lambda x: " ".join(x))
    df["skills"] = df["skills"].apply(lambda x: " ".join(x))
    df["techFields"] = df["techFields"].apply(lambda x: " ".join(x))
    df["profession"] = df["profession"].apply(preprocess_text)

    df_str = (
        weights["city"] * df["city"]
        + weights["goals"] * df["goals"]
        + weights["experience"] * df["experience"]
        + weights["programmingLanguages"] * df["programmingLanguages"]
        + weights["skills"] * df["skills"]
        + weights["techFields"] * df["techFields"]
        + weights["profession"] * df["profession"]
    )

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df_str)

    weighted_tfidf_matrix = tfidf_matrix.multiply(weights["tfidf"])

    cosine_sim = cosine_similarity(weighted_tfidf_matrix, weighted_tfidf_matrix)
    sim_scores = list(enumerate(cosine_sim[user_id - 1]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    return [x[0] + 1 for x in sim_scores[1:]]


def print_recommendations(user_id, recommendations, df):
    user_profile = df[df["id"] == user_id]

    user_table = PrettyTable()
    user_table.field_names = user_profile.columns
    user_table.add_row(user_profile.values[0])

    recommendations_table = PrettyTable()
    recommendations_table.field_names = user_profile.columns

    for recommended_user_id in recommendations:
        recommended_profile = df[df["id"] == recommended_user_id]
        recommendations_table.add_row(recommended_profile.values[0])

    print("User Profile:")
    print(user_table)
    print("\nRecommendations for user", user_id, ":")
    print(recommendations_table)

if __name__ == "__main__":
    # Load recommendations data
    recommendations_data = load_recommendations()

    if recommendations_data:
        # If recommendations_data is a list of dictionaries, use it directly
        if all(isinstance(item, dict) for item in recommendations_data):
            df = pd.DataFrame(recommendations_data)

            # Ensure that the "id" column is present
            if "id" not in df.columns:
                print("Error: 'id' column not found in DataFrame.")
                df = pd.DataFrame()  # Creating an empty DataFrame for safety
            else:
                # Continue with the rest of the code...
                # Define feature weights, get user input, get recommendations, and print recommendations
                weights = {
                    "city": 2,
                    "goals": 2,
                    "experience": 5,
                    "programmingLanguages": 4,
                    "skills": 4,
                    "techFields": 7,
                    "profession": 5,
                    "tfidf": 1,
                }

                user_id = int(input("Enter your user ID: "))

                recommendations = get_recommendations(user_id, df, weights)
                print_recommendations(user_id, recommendations, df)
        else:
            print("Invalid format in recommendations_data. Expecting a list of dictionaries.")
            df = pd.DataFrame()  # Creating an empty DataFrame for safety
    else:
        print("No data found in recommendations_data.")
        df = pd.DataFrame()  # Creating an empty DataFrame for safety