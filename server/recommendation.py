import pandas as pd
import string
import json

def preprocess_text(text):
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    tokens = text.split()
    return ' '.join(tokens)

def load_recommendations(file_path='recommendations.json'):
    try:
        with open(file_path, 'r') as file:
            recommendations = json.load(file)
        return recommendations
    except FileNotFoundError:
        print(f"File '{file_path}' not found. Please make sure the file exists.")
        return None
    except json.JSONDecodeError:
        print(f"Error decoding JSON in '{file_path}'. Please check the file format.")
        return None
    
def get_recommendations(user_id, df):
    user_profile = df[df['id'] == user_id]

    if user_profile.empty:
        print(f"User with ID {user_id} not found.")
        return []

    user_profile_str = f"{user_profile['city'].values[0]} {user_profile['goals'].values[0]} {user_profile['experience'].values[0]}"

    df['city'] = df['city'].apply(preprocess_text)
    df['goals'] = df['goals'].apply(preprocess_text)
    df['experience'] = df['experience'].apply(preprocess_text)

    df_str = df['city'] + ' ' + df['goals'] + ' ' + df['experience']
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df_str)

    weighted_tfidf_matrix = tfidf_matrix.multiply(['tfidf'])
