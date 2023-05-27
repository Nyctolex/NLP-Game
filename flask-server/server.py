from flask import Flask, request, jsonify
import random
from wordHandler import WordHandler

app = Flask(__name__)
wordHandler = WordHandler()

@app.route("/cards", methods=['GET'])
def cards():
    # c = []
    # for i in range(5*5):
    #     c.append({"title": "Card"+str(i),
    #               "description": f'Description of card {i}'})
    cards_dict = wordHandler.get_words(5*5)
    return  {"cards": cards_dict}

@app.route("/newBoards", methods=['GET'])
def newBoard():
    cardsdict = cards()
    return cardsdict

@app.route('/association', methods=['POST'])
def association():
    word = request.json.get('word')
    words = request.json.get('words')
    num = int(request.json.get('num'))
    closestWords = wordHandler.get_k_nearest_neighbors(word, words, num)
    # print('Received word:', word)
    # print('Received words:', words)
    # print('Received num:', num)
    # closestWords = random.sample(words, num)
    if closestWords is None:
        return "No similar words found", 400
    response = {'closetWords': closestWords}
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)