const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const collection = require('../../serve')
const router = express.Router();

//Get one sales
router.get('/', async (req, res) => {
    const sales =  await collection.loadCollection('sales');
    res.send(await sales.find({}).toArray());
})

//Get sales
router.get('/:id', async (req, res) => {
    const sales =  await collection.loadCollection('sales');
    // var query = {_id: new mongodb.ObjectID(req.params.id)};
    // sales.findOne(query, function(err, sale){
    //     if (err){
    //         res.send("errr",err)
    //     }else{
    //         res.send(sale)
    //     }

    // });
    var query = { productionId: req.params.id };
    res.send(await sales.find(query).toArray())
})

//Add sales
router.post('/', async (req, res) => {
    const sales =  await collection.loadCollection('sales');
    
    await sales.insertOne({
        createdAt: Date(),
        updatedAt: Date(),
        finishedAt: req.body.finishedAt,
        saleBy: req.body.saleBy,
        productionId: req.body.productionId,
        user: req.body.user,
        products: req.body.products,
        total: req.body.total
    }, { timestamps: true });

    var query = { productionId: req.body.productionId };
    res.status(201).send(await sales.find(query).toArray());
})


//Delete sales
router.delete('/:id/:productionId', async(req, res) => {
    const sales =  await collection.loadCollection('sales');
    //sales.drop();
    await sales.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    var query = { productionId: req.params.productionId };
    res.status(200).send(await sales.find(query).toArray());
});


//Update sales
router.put('/:id', async(req, res) => {
    console.log(req.body)
    const sales =  await collection.loadCollection('sales');
    await sales.updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "updatedAt": Date(),
                "finishedAt": req.body.finishedAt,
                "saleBy": req.body.saleBy,
                "user": req.body.user,
                "total": req.body.total,
                "products": req.body.products
                }
        })
    
    var query = { productionId: req.body.productionId };
    res.status(200).send(await sales.find(query).toArray()); 
    //res.status(200).send();
});
    


module.exports = router;