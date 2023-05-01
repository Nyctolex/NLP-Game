import os
import gensim.downloader as api
import numpy as np

MODEL_NAME = 'word2vec-google-news-300'

def download_model():
    if not os.path.exists(f'{MODEL_NAME}.zip'):
        print(f'Downloading {MODEL_NAME}...')
        api.load(MODEL_NAME, return_path=True)
        print(f'{MODEL_NAME} downloaded successfully.')
    else:
        print(f'{MODEL_NAME} already exists in local directory.')

def load_model():
    download_model()
    model_path = f'{MODEL_NAME}.model'
    if not os.path.exists(model_path):
        print(f'Extracting {MODEL_NAME}...')
        api.load(MODEL_NAME)
        print(f'{MODEL_NAME} extracted successfully.')
    model = api.load(MODEL_NAME)
    return model

def find_closest_words(word, word_list, n):
    # Load pre-trained Word2Vec model
    model = load_model()

    # Get word embeddings for the given word and the word list
    word_embedding = model[word]
    word_list_embeddings = [model[w] for w in word_list]

    # Calculate cosine similarity between the given word and each word in the list
    similarities = np.dot(word_list_embeddings, word_embedding) / (np.linalg.norm(word_embedding) * np.linalg.norm(word_list_embeddings, axis=1))

    # Sort the words by similarity and return the top n words
    closest_words = [word_list[i] for i in similarities.argsort()[::-1][:n]]
    return closest_words



# word = "bird"
# word_list = ["dog", "cat", "table", "controller"] 
# n = 1
# find_closest_words(word, word_list, n)
download_model()