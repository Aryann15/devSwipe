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