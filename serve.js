const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// async function loadCollection(collection, aggregate, foreign){
//     const client = await mongodb.MongoClient.connect
//     ('mongodb+srv://rafahells:uMG4VI7RE8T8hX46@cluster0.emtec.mongodb.net/salty?retryWrites=true&w=majority', {
//         useUnifiedTopology: true
//     });

//     // console.log(aggregate)
//     // if(aggregate)
//     //     return client.db('salty').collection(collection).aggregate([{
//     //         $lookup:
//     //         {
//     //             from: aggregate,
//     //             localField: "_id.toString()",
//     //             foreignField: foreign + ".toString()",
//     //             as: "fuck"
//     //         }
//     //     },
//     //     { "$project": {
//     //         "total": { "$sum": "$fuck.total" }
//     //       }}
//     //     ]).toArray()
//     // else
//     //     return client.db('salty').collection(collection);
// }

async function loadConnection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://rafahells:uMG4VI7RE8T8hX46@cluster0.emtec.mongodb.net/salty?retryWrites=true&w=majority', {
        useUnifiedTopology: true
    });

    return client.db('salty');
}

module.exports = { loadConnection };