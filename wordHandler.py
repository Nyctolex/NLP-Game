from gensim.models import Word2Vec, KeyedVectors
import nltk
from gensim.models import Word2Vec, KeyedVectors
import random
from nltk.corpus import wordnet
import nltk
# from profanity_check import predict
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from typing import Union
import gensim.downloader as api
# Download the necessary resources (if not already downloaded)
# nltk.download('punkt')

# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

# Download the necessary resources (if not already downloaded)
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('brown')

MODELS_OPTIONS = ["glove-twitter-50", "glove-twitter-100", "glove-twitter-200", "glove-wiki-gigaword-300", "word2vec-google-news-300"]
class WordHandler:
    def __init__(self, model_name = "glove-twitter-50"):
        print("Loading NLP model")
        self.model = api.load(model_name)
        print("Model is loaded")
        # KeyedVectors.load_word2vec_format('./word2vec_twitter_model.bin',binary=True)
        corpus = nltk.corpus.brown
        self.word_freq_dist = nltk.FreqDist(corpus.words())
        # Get a set of common stop words
        self.stop_words = set(stopwords.words('english'))
        self.most_common_words = self.word_freq_dist.most_common()
        
        
    def definition_exists(self, word:str)->bool:
        return len(wordnet.synsets(word)) > 0
        
    def get_frequent_words(self, n: int, sfw: bool = True, min_freq:int = 4) -> list[str]:
        # Create a list of the most frequent SFW words
        random.shuffle(self.most_common_words)  # Shuffle the word list
        word_list: list[str] = []
        i = 0
        while len(word_list) < n:
            word, freq = self.most_common_words[i]
            print(word, freq)
            i = i+1
            # Skip if word is a stop word or less frequent than 2
            if freq <= min_freq or word in self.stop_words:
                continue
            
            if not self.definition_exists(word):
                continue

            if word in self.model.key_to_index and word not in word_list:
                word_list.append(word)
                if len(word_list) == n:
                    break

        
        return word_list[:n]  # Return the first n random words
    
    def get_defenition(self, word: str)->list[str]:
        # Retrieve synsets (word senses) from WordNet
        synsets = wordnet.synsets(word)
        # Get the first synset (most common sense)
        synset = synsets[:3]
        # Retrieve the definition
        definition = [ d.definition() for d in synset]
        return definition
    
    def get_words(self, n:int, sfw:bool=True) -> list[dict[str, Union[ list[str], str] ]]:
        words_list:list[str] = self.get_frequent_words(n, sfw)
        return_list: list[dict[str, Union[ list[str], str] ]] = []
        for word in words_list:
            defenitions:list[str] = self.get_defenition(word)
            return_list.append({"title": word, "description": defenitions})
        return return_list
    
    def get_distance(self, word1, word2):
        return self.model.similarity(word1, word2)
    
    def get_k_nearest_neighbors(self, word, word_list, k):
        if not word in self.model.key_to_index:
            return None
        # Calculate distances between the given word and all words in the list
        distances = [(w, self.get_distance(word, w)) for w in word_list]

        # Sort the distances in ascending order
        sorted_distances = sorted(distances, key=lambda x: -1*x[1])
        print(sorted_distances)

        # Get the k nearest neighbors
        nearest_neighbors = [w[0] for w in sorted_distances[:k]]

        return nearest_neighbors

if __name__ == "__main__":
    o = WordHandler()
    words_dict = o.get_words(10)
    words = [x['title'] for x in words_dict]
    word = words[3]
    print(words)
    print(word)
    print(o.get_k_nearest_neighbors("cook", ["cook", "rock", "ask"], 1))
    
        
        
        
