const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const url = 'mongodb+srv://rafahells:uMG4VI7RE8T8hX46@cluster0.emtec.mongodb.net/salty?retryWrites=true&w=majority';
const conn = mongodb.MongoClient;

// async function loadConnection(){
//     const client = await mongodb.MongoClient.connect
//     ('mongodb+srv://rafahells:uMG4VI7RE8T8hX46@cluster0.emtec.mongodb.net/salty?retryWrites=true&w=majority', {
//         useUnifiedTopology: true
//     });
//     console.log(client.isConnected())
//     return client.db('salty');
// }

const client = {};

var _db;
async function loadConnection(){
    if (!client.isConnected){
        _db = await conn.connect(url, { useUnifiedTopology: true });
        client.isConnected = _db.isConnected();
        return _db.db('salty');
    }
    else {
        return _db.db('salty');
    }
    
}

// connectToServer: function( callback ) {
//     MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
//       _db  = client.db('test_db');
//       return callback( err );
//     } );
//   }

module.exports = { loadConnection };