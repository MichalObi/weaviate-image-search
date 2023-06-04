const { default: weaviate } = require('weaviate-ts-client');

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

client.misc
    .liveChecker()
    .do()
    .then(res => {
        console.log('res', res);
    })
    .catch(err => {
        console.error('err', err);
    });

client
    .schema
    .getter()
    .do()
    .then(schemaRes => {
        console.log('schemaRes', schemaRes);
    })
    .catch(err => {
        console.error('err', err);
    });