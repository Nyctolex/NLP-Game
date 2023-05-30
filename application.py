from flask import Flask, request, jsonify, send_from_directory
import os

application = Flask(__name__, static_folder='build')
app = application
# if not 'wordHandler' in globals():
#     wordHandler = WordHandler()

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
    c = []
    for i in range(5*5):
        c.append({"title": "Card"+str(i),
                  "description": [f'Description of card {i}']})
    # cards_dict = wordHandler.get_words(5*5)
    return  {"cards": c}

@app.route("/newBoards", methods=['GET'])
def newBoard():
    cardsdict = cards()
    return cardsdict


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 80)))