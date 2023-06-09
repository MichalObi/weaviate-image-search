import { readFileSync, writeFileSync } from 'fs'
import weaviate from 'weaviate-ts-client';

// connect to db client
const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

// check if db is online
const liveChecker = await client.misc.liveChecker().do();
console.log('liveChecker', liveChecker);

// create schema for db
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

// create 'MEME' schema - run once after db init
client.schema
    .classCreator()
    .withClass(schemaConfig)
    .do()
    .then(schemaRes => console.log('schemaRes', schemaRes))
    .catch(err => console.error('err', err));

const schemaRes = await client.schema.getter().do();
console.log('schemaRes', schemaRes);

// store img to db - no loop, invoke for every meme in img folder

// const img = readFileSync('./img/guy.jpg');
// const b64 = Buffer.from(img).toString('base64');

// await client.data.creator()
//     .withClassName('Meme')
//     .withProperties({
//         image: b64,
//         text: 'guy meme'
//     })
//     .do();

const inputImgame = 'aMEPeB1_460s.jpg';
const inputImgBase = Buffer.from(readFileSync(`./img/${inputImgame}`)).toString('base64');

const resImage = await client.graphql.get()
    .withClassName('Meme')
    .withFields(['image'])
    .withNearImage({ image: inputImgBase })
    .withLimit(1)
    .do();

// write result to filesystem
const result = resImage.data.Get.Meme[0].image;
writeFileSync('./result.jpg', result, 'base64');