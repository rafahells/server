const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const collection = require('../../serve')
const router = express.Router();

//Get one production
router.get('/', async (req, res) => {
    const production =  await collection.loadCollection('production');
    if(req.query.last === 'true'){ 
        var query = { finishedAt: {} };
        res.send(await production.find(query).sort( { _id : -1 } ).limit(1).toArray());
    }
    else
        res.send(await production.find({}).toArray());
})

//Get production
router.get('/:id', async (req, res) => {
    const production =  await collection.loadCollection('production');
    res.send(production.findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Add production
router.post('/', async (req, res) => {
    const production =  await collection.loadCollection('production');
    
    await production.insertOne({
        createdAt: Date(),
        updatedAt: Date(),
        finishedAt: { type: Date },
        cost: req.body.cost,
        total: req.body.total,
        products: req.body.products
    }, { timestamps: true });
    res.status(201).send(await production.find({}).toArray());
})


//Delete production
router.delete('/:id', async(req, res) => {
    const production =  await collection.loadCollection('production');
    //production.drop();
    await production.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await production.find({}).toArray());
});


//Update production
router.put('/:id', async(req, res) => {
    const production =  await collection.loadCollection('production');
    await production.updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "updatedAt": Date(),
                "finishedAt": req.body.finishedAt,
                "cost": req.body.cost,
                "total": req.body.total,
                "products": req.body.products
                }
        })
    res.status(200).send(await production.find().sort( { _id : -1 } ).limit(1).toArray());
    
});
    


module.exports = router;