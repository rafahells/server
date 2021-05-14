const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const connection = require('../../serve');
const router = express.Router();

//Get one users
router.get('/', async (req, res) => {
    const db =  await connection.loadConnection();
    res.send(await db.collection('users').find({}).toArray());
})

//Get users
router.get('/:id', async (req, res) => {
    const db =  await connection.loadConnection();
    res.send(users.findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Add users
router.post('/', async (req, res) => {
    const db =  await connection.loadConnection();
    await db.collection('users').insertOne({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        instagram: req.body.instagram,
        facebook: req.body.facebook
    }, { timestamps: true });
    res.status(201).send(await db.collection('users').find({}).toArray());
})


//Delete users
router.delete('/:id', async(req, res) => {
    const db =  await connection.loadConnection();
    //users.drop();
    await db.collection('users').deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await db.collection('users').find({}).toArray());
});


//Update users
router.put('/:id', async(req, res) => {
    const db =  await connection.loadConnection();
    await db.collection('users').updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "name": req.body.name,
                "address": req.body.address,
                "phone": req.body.phone,
                "instagram": req.body.instagram,
                "facebook": req.body.facebook
                }
        })
    res.status(200).send();
});
    


module.exports = router;