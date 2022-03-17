const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
const index = client.initIndex("books");

export function addToAlgoliaIndex(book) {
    index.saveObjects([book]);
}