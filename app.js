import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const liveChecker = await client.misc.liveChecker().do();

console.log('liveChecker', liveChecker);

const schemaConfig = {
    'class': 'Meme',
    'vectorizer': 'img2vec-neural',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            'name': 'image',
            'dataType': ['blob']
        },
        {
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

// create 'MEME' schema
// client.schema
//     .classCreator()
//     .withClass(schemaConfig)
//     .do()
//     .then(schemaRes => {
//         console.log('schemaRes', schemaRes);
//     })
//     .catch(err => {
//         console.error('err', err);
//     });

const schemaRes = await client.schema.getter().do();

console.log('schemaRes', schemaRes);