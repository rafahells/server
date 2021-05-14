const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const connection = require('../../serve')
const router = express.Router();

//Get one production
router.get('/', async (req, res) => {
    const db = await connection.loadConnection();
    if(req.query.last === 'true'){ 
        var prod2 = db.collection('production').find({}).sort({_id:-1}).limit(1);
        res.send(await prod2.toArray());
    }
    else{
        var prod = db.collection('production').aggregate([
            {
                $lookup:
                {
                    from: 'sales',
                    let: { "idFromProduction": "$_id" },
                    pipeline: [
                        { "$addFields": { "productionId": { "$toObjectId": "$productionId" }}},
                        { $match:
                            { $expr:
                               { $and:
                                  [
                                    { $ne: [ "$finishedAt", null] },
                                    { $eq: [ "$productionId",  "$$idFromProduction" ] }
                                  ]
                               }
                            }
                        },                  
                        {
                            $group : {
                               _id : "$saleBy",
                               productionId : { "$first": "$productionId" },
                               total: { $sum: "$total" }
                            }
                        }
                     ],
                    as: "sales"
                }
            },
            {
                $sort: {"_id ": -1}
            }
            // {
            //     $group : {
            //        _id : "$_id",
            //        production : { "$first": "$$ROOT" }
            //     }
            // }
        ]).toArray()
        res.send(await prod);
    }
})

//Get production
router.get('/:id', async (req, res) => {
    const db = await connection.loadConnection();
    res.send(await db.collection('production').findOne({_id: new mongodb.ObjectID(req.params.id)}));
})

//Add production
router.post('/', async (req, res) => {
    const db = await connection.loadConnection();
    await db.collection('production').insertOne({
        createdAt: Date(),
        updatedAt: Date(),
        finishedAt: { type: Date },
        cost: req.body.cost,
        total: req.body.total,
        products: req.body.products
    }, { timestamps: true });
    res.status(201).send(await db.collection('production').find({}).toArray());
})


//Delete production
router.delete('/:id', async(req, res) => {
    const db = await connection.loadConnection();
    //production.drop();
    await db.collection('production').deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send(await db.collection('production').find({}).toArray());
});


//Update production
router.put('/:id', async(req, res) => {
    const db = await connection.loadConnection();

    await db.collection('production').updateOne({ _id: new mongodb.ObjectID(req.params.id)},
        {
            $set: {
                "updatedAt": Date(),
                "finishedAt": req.body.finishedAt,
                "cost": req.body.cost,
                "total": req.body.total,
                "products": req.body.products
                }
        })
    res.status(200).send(await db.collection('production').find().sort( { _id : -1 } ).limit(1).toArray());
    
});
    


module.exports = router;