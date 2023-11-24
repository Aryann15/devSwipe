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


def load_recommendations(file_path="recommendations.json"):
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


def get_recommendations(user_id, df):
    user_profile = df[df["id"] == user_id]

    if user_profile.empty:
        print(f"User with ID {user_id} not found.")
        return []

    user_profile_str = f"{user_profile['city'].values[0]} {user_profile['goals'].values[0]} {user_profile['experience'].values[0]}"

    df["city"] = df["city"].apply(preprocess_text)
    df["goals"] = df["goals"].apply(preprocess_text)
    df["experience"] = df["experience"].apply(preprocess_text)

    df_str = df["city"] + " " + df["goals"] + " " + df["experience"]
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df_str)

    weighted_tfidf_matrix = tfidf_matrix.multiply(["tfidf"])
    cosine_sim = cosine_similarity(weighted_tfidf_matrix, weighted_tfidf_matrix)
    sim_scores = list(enumerate(cosine_sim[user_id - 1]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    return [x[0] + 1 for x in sim_scores[1:]]  # Exclude the user itself


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
    recommendations_data = load_recommendations()

    if recommendations_data:
        df = pd.DataFrame(recommendations_data)

        user_id = int(input("Enter your user ID: "))

        recommendations = get_recommendations(user_id, df, weights)
        print_recommendations(user_id, recommendations, df)
