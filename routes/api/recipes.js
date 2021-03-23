const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const collection = require('../../serve')
const router = express.Router();

//Get one recipes
router.get('/', async (req, res) => {
    const recipes =  await collection.loadCollection('recipes');
    res.send(await recipes.find({}).toArray());
})

//Get recipes
router.get('/:id', async (req, res) => {
    const recipes =  await collection.loadCollection('recipes');
    res.send(recipes.findOne({_id: new mongodb.ObjectID(req.params.id)}));
    //res.send(mongodb.ObjectID(req.params.id).getTimestamp());
})

//Add recipes
router.post('/', async (req, res) => {
    const recipes =  await collection.loadCollection('recipes');
    
    await recipes.insertOne({
        description: req.body.description,
        quantity: req.body.quantity,
        cost: req.body.cost,
        price: req.body.price,
        directions: req.body.directions,
        ingredients: req.body.ingredients
    }, { timestamps: true });
    res.status(201).send(await recipes.find({}).toArray());
})


//Delete recipes
router.delete('/:id', async(req, res) => {
    const recipes =  await collection.loadCollection('recipes');
    //recipes.drop();
    await recipes.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await recipes.find({}).toArray());
});


//Update recipes
router.put('/:id', async(req, res) => {
    const recipes =  await collection.loadCollection('recipes');
    await recipes.updateOne({ _id: new mongodb.ObjectID(req.params.id)},
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