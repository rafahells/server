const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const collection = require('../../serve');
const router = express.Router();

//Get one users
router.get('/', async (req, res) => {
    const users =  await collection.loadCollection('users');
    res.send(await users.find({}).toArray());
})

//Get users
router.get('/:id', async (req, res) => {
    const users =  await collection.loadCollection('users');
    res.send(users.findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Add users
router.post('/', async (req, res) => {
    const users =  await collection.loadCollection('users');
    await users.insertOne({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        instagram: req.body.instagram,
        facebook: req.body.facebook
    }, { timestamps: true });
    res.status(201).send(await users.find({}).toArray());
})


//Delete users
router.delete('/:id', async(req, res) => {
    const users =  await collection.loadCollection('users');
    //users.drop();
    await users.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await users.find({}).toArray());
});


//Update users
router.put('/:id', async(req, res) => {
    const users =  await collection.loadCollection('users');
    await users.updateOne({ _id: new mongodb.ObjectID(req.params.id)},
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