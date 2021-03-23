const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


async function loadCollection(collection){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://rafahells:uMG4VI7RE8T8hX46@cluster0.emtec.mongodb.net/salty?retryWrites=true&w=majority', {
        useUnifiedTopology: true
    });

    return client.db('salty').collection(collection)
}

module.exports = { loadCollection };