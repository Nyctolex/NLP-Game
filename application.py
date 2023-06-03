from flask import Flask, request, jsonify, send_from_directory
import os
from wordHandler import WordHandler

application = Flask(__name__, static_folder='build')
app = application

if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
    # The reloader has already run
    wordHandler = WordHandler()
    
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')



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