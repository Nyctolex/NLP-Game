from flask import Flask, render_template
import generate_words
import random

app = Flask(__name__)
app.static_folder = 'static'  # set the static folder


app = Flask(__name__)

@app.route('/')
def index():
    word_list = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'pear', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon']
    random.shuffle(word_list)
    words = generate_words.get_word_definitions(25)
    cards = [{'word': word, 'definition': 'This is the definition of ' + word} for word in word_list]
    cards = [{'word': word, 'definition': words[word]} for word in words]
    return render_template('index.html', cards=cards)

if __name__ == '__main__':
    app.run(debug=True)
