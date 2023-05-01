async function loadModel() {
    const modelUrl = 'path/to/model.json';
    const model = await tf.loadLayersModel(`file://${modelUrl}`);
    return model;
  }
  
  async function findDistance() {
    const word1 = 'apple';
    const word2 = 'orange';
    
    // Load pre-trained Word2Vec model
    const model = await loadModel();
  
    // Get word embeddings for word1 and word2
    const embeddings = model.getLayer('embedding');
    const word1Embedding = embeddings.getWeights()[0].slice([model.getVocabulary().indexOf(word1), 0], [1, -1]);
    const word2Embedding = embeddings.getWeights()[0].slice([model.getVocabulary().indexOf(word2), 0], [1, -1]);
  
    // Calculate the cosine distance between word1 and word2
    const cosineDistance = tf.losses.cosineDistance(word1Embedding, word2Embedding, 0).dataSync()[0];
    const euclideanDistance = tf.norm(word1Embedding.sub(word2Embedding), 'euclidean').dataSync()[0];
  
    // Display the distance between word1 and word2
    document.getElementById("output").innerHTML = `Cosine distance: ${cosineDistance}<br>Euclidean distance: ${euclideanDistance}`;
  }
  
  loadModel();