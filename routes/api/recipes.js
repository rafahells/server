const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const connection = require('../../serve')
const router = express.Router();

//Get one recipes
router.get('/', async (req, res) => {
    const db =  await connection.loadConnection();
    res.send(await db.collection('recipes').find({}).toArray());
})

//Get recipes
router.get('/:id', async (req, res) => {
    const db =  await connection.loadConnection();
    res.send(await db.collection('recipes').findOne({_id: new mongodb.ObjectID(req.params.id)}));
    //res.send(mongodb.ObjectID(req.params.id).getTimestamp());
})

//Add recipes
router.post('/', async (req, res) => {
    const db =  await connection.loadConnection();
    
    await db.collection('recipes').insertOne({
        description: req.body.description,
        quantity: req.body.quantity,
        cost: req.body.cost,
        price: req.body.price,
        directions: req.body.directions,
        ingredients: req.body.ingredients
    }, { timestamps: true });
    res.status(201).send(await db.collection('recipes').find({}).toArray());
})


//Delete recipes
router.delete('/:id', async(req, res) => {
    const db =  await connection.loadConnection();
    //recipes.drop();
    await db.collection('recipes').deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await db.collection('recipes').find({}).toArray());
});


//Update recipes
router.put('/:id', async(req, res) => {
    const db =  await connection.loadConnection();
    await db.collection('recipes').updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "description": req.body.description,
                "quantity": req.body.quantity,
                "cost": req.body.cost,
                "price": req.body.price,
                "directions": req.body.directions,
                "ingredients": req.body.ingredients
                }
        })
    res.status(200).send();
    
});
    


module.exports = router;