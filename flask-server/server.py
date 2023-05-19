from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route("/cards", methods=['GET'])
def cards():
    c = []
    for i in range(5*5):
        c.append({"title": "Card"+str(i),
                  "description": f'Description of card {i}'})
    return  {"cards": c}

@app.route("/newBoards", methods=['GET'])
def newBoard():
    cardsdict = cards()
    return cardsdict

@app.route('/association', methods=['POST'])
def association():
    word = request.json.get('word')
    words = request.json.get('words')
    num = int(request.json.get('num'))
    print('Received word:', word)
    print('Received words:', words)
    print('Received num:', num)
    closestWords = random.sample(words, num)
    response = {'closetWords': closestWords}
    print(response)
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)