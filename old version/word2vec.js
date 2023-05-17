async function findClosestWords() {
    const word = document.getElementById("word").value;
    const wordsList = document.getElementById("wordsList").value.split(",");
    const n = document.getElementById("n").value;
    
    // Load pre-trained Word2Vec model
    const model = await loadModel();
  
    // Convert wordsList to vectors using Word2Vec
    const wordVectors = wordsList.map(word => model.embed(word).arraySync()[0]);
  
    // Calculate cosine similarity between given word and words in wordsList
    const similarities = [];
    const givenWordVector = model.embed(word).arraySync()[0];
    for (let i = 0; i < wordVectors.length; i++) {
      const similarity = cosineSimilarity(givenWordVector, wordVectors[i]);
      similarities.push([wordsList[i], similarity]);
    }
  
    // Sort the similarities and get the top n closest words
    similarities.sort((a, b) => b[1] - a[1]);
    const closestWords = similarities.slice(0, n).map(similarity => similarity[0]);
  
    // Display the closest words to the user
    document.getElementById("output").innerHTML = closestWords.join(", ");
  }
  
  async function loadModel() {
    const modelUrl = 'https://tfhub.dev/google/tfjs-model/nnlm-en-dim50/2/default/1';
    const model = await tf.loadLayersModel(modelUrl);
    return model;
  }
  
  function loadModel() {
    const modelUrl = 'path/to/model.json';
    const model = await tf.loadLayersModel(`file://${modelUrl}`);
    return model;
  }
  
  function cosineSimilarity(vectorA, vectorB) {
    const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
  