const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const connection = require('../../serve')
const router = express.Router();

//Get one sales
router.get('/', async (req, res) => {
    const db =  await connection.loadConnection();
    res.send(await db.collection('sales').find({}).toArray());
})

//Get sales
router.get('/:id', async (req, res) => {
    const db =  await connection.loadConnection();
    // var query = {_id: new mongodb.ObjectID(req.params.id)};
    // sales.findOne(query, function(err, sale){
    //     if (err){
    //         res.send("errr",err)
    //     }else{
    //         res.send(sale)
    //     }

    // });
    var query = { productionId: req.params.id };
    res.send(await db.collection('sales').find(query).toArray())
})

//Add sales
router.post('/', async (req, res) => {
    const db =  await connection.loadConnection();
    
    await db.collection('sales').insertOne({
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
    res.status(201).send(await db.collection('sales').find(query).toArray());
})


//Delete sales
router.delete('/:id/:productionId', async(req, res) => {
    const db =  await connection.loadConnection();
    //sales.drop();
    await db.collection('sales').deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    var query = { productionId: req.params.productionId };
    res.status(200).send(await db.collection('sales').find(query).toArray());
});


//Update sales
router.put('/:id', async(req, res) => {
    console.log(req.body)
    const db =  await connection.loadConnection();
    await db.collection('sales').updateOne({ _id: new mongodb.ObjectID(req.params.id)},
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
    res.status(200).send(await db.collection('sales').find(query).toArray()); 
});

router.put('/', async(req, res) => {
    console.log(req.body.saleBy)
    const db =  await collection.loadConnection();
    db.collection('sales').updateMany(
        {
            
        },
        {
            $set: {
                "saleBy": req.body.saleBy
                }
        })
    
    res.status(200).send(); 
})

    


module.exports = router;