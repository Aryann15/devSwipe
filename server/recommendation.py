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