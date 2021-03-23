const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const collection = require('../../serve')
const router = express.Router();

//Get one items
router.get('/', async (req, res) => {
    const items =  await collection.loadCollection('items');
    res.send(await items.find({}).sort( { description: +1 } ).toArray());
})

//Get items
router.get('/:id', async (req, res) => {
    const items =  await collection.loadCollection('items');
    res.send(items.findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Add items
router.post('/', async (req, res) => {
    const items =  await collection.loadCollection('items');
    
    await items.insertOne({
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    }, { timestamps: true });
    // if(Array.isArray(req.body)){
    //     await items.insertMany(req.body, { timestamps: true });
    // } else{
    //     await items.insertOne({
    //         description: req.body.description,
    //         quantity: req.body.quantity,
    //         price: req.body.price
    //     }, { timestamps: true });
    // }
    res.status(201).send(await items.find({}).sort( { description: +1 } ).toArray());
})


//Delete items
router.delete('/:id', async(req, res) => {
    const items =  await collection.loadCollection('items');
    //items.drop();
    await items.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await items.find({}).sort( { description: +1 } ).toArray());
});


//Update items
router.put('/:id', async(req, res) => {
    const items =  await collection.loadCollection('items');
    await items.updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "description": req.body.description,
                "quantity": req.body.quantity,
                "price": req.body.price
                }
        })
    res.status(200).send();
    
});
    


module.exports = router;