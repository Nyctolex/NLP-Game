from nltk.corpus import wordnet
import random
import nltk

def get_word_definitions(n):
    # Load the wordnet corpus
    wordnet.ensure_loaded()

    # Get a list of all noun synsets in wordnet
    noun_synsets = list(wordnet.all_synsets('n'))

    # Generate a list of n random words
    words = []
    while len(words) < n:
        # Select a random noun synset
        while True:
            synset = random.choice(noun_synsets)
            # Get the first lemma (i.e., word) of the synset
            word = synset.lemmas()[0].name() 
            if not '_' in word:
                break
        # Get the definition of the synset
        definition = synset.definition()
        # Add the word and definition to the list
        words.append((word, definition))

    # Convert the list of tuples to a dictionary
    word_dict = dict(words)

    return word_dict


if __name__ == "__main__":
    nltk.download('wordnet')
    word_dict = get_word_definitions(10)
    print(word_dict)
