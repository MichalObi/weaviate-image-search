# Meme Similarity Finder

This project allows users to find similar memes for a given input meme image using Weaviate vector database. The system first requires training the AI model by passing a set of memes to the database. Once trained, users can provide an image as input, and the code will return similar memes based on the provided image.
For proof of concept repo includes test set of img, and one result image returned by trained model when sample img provided.

## Setup

### Prerequisites
- Docker
- Node.js

## Additional Steps

### Adding Docker Compose Support
If you prefer using Docker Compose for managing containers, you can create a `docker-compose.yml` file with the following contents:
```yaml
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:1.19.6
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      IMAGE_INFERENCE_API: 'http://i2v-neural:8080'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'img2vec-neural'
      ENABLE_MODULES: 'img2vec-neural'
      CLUSTER_HOSTNAME: 'node1'
  i2v-neural:
    image: semitechnologies/img2vec-pytorch:resnet50
    environment:
      ENABLE_CUDA: '0'
```
Then, you can start both the Weaviate container and the Node.js script using the following command:
```
docker-compose up -d
```

### 1. Clone the Repository
```
git clone https://github.com/your-username/repository.git
cd repository
```

### 2. Start Weaviate Vector Database Docker Container
```
curl -o docker-compose.yml <link to container from Weaviate webpage>
docker-compose up -d
```
This command will pull the Weaviate Docker image and start a container named `weaviate` on port `8080`.

### 3. Train the AI Model
To train the AI model, you need to pass the meme images to the Weaviate vector database. The exact steps for training may vary depending on the specific implementation details of your project. However, here's a high-level overview of the process:

- Convert the meme images to suitable vectors using a pre-trained model or feature extraction technique.
- Establish a connection to the Weaviate database from your Node.js script.
- Iterate over the meme images and store the vector representations in the Weaviate database using appropriate API calls.

Refer to the Weaviate documentation or your specific implementation for detailed instructions on training the AI model.

### 4. Start the Node.js Script
```
npm init -y
npm i weaviate-ts-client
node script.js
```
This will install the required dependencies and run the Node.js script, which will prompt the user to provide an image as input and return similar memes based on the input image.

Make sure to update the `script.js` file with the necessary code to connect to the Weaviate database and perform similarity queries.

### Enhancing the User Interface
To provide a more user-friendly interface for interacting with the system, you can consider building a web application using frameworks like Express.js or React.js. This would allow users to upload an image through a browser interface and receive the results directly.

## Conclusion
The Meme Similarity Finder project enables users to find similar memes based on an input image. By following the setup instructions and training the AI model using the Weaviate vector database, users can leverage the power of similarity search to discover memes that match their desired criteria.
