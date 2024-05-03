const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.post('/contact', async (req, res) => {
    const userInfo = {
        username:"user",
        password:"hunter2",
        id:1,
        entries:[{
            invoiceId: 1,
            client: "Brother",
            description: "For Fun",
            price: 10,
            paid: 5
        }]
    }
    const newUser = new schemas.Users(userInfo)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("worked")
    }
    res.end()
})

router.post('/add', async (req, res) => {
    const {invoiceId, client, description, price, paid} = req.body
    // const entry = {
    //     invoiceId: invoiceId,
    //     client: client,
    //     description: description,
    //     price: price,
    //     paid: paid ? paid : 0
    // }
    
    // const newEntry = new schemas.Entries(entry)
    //console.log(newEntry)
    
    // const query = schemas.Users.where({id: 1})
    // const y = await query.findOne()
    //console.log(y)

    // schemas.Users.findOne({id: 1})
    //     .then((docs) => {
    //         console.log("Results: ", docs)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    const x = await schemas.Users.findOneAndUpdate(
        { id: 1 },
        {
            $push: {
                "entries": {
                    invoiceId: invoiceId,
                    client: client,
                    description: description,
                    price: price,
                    paid: paid
                },
            },
        },
        { new: true },
    );


    //console.log(x)

    // const user = schemas.Users.findOne({id:1})
    // const newUser = await user.entries.push(newEntry)
    // console.log(user)
    // const saveUser = newUser.save()
    // if(saveUser){
        res.send("Entry Added")
    //}
    res.end()
})

router.get('/users', async (req, res) => {
    const userData = await schemas.Users.find({}, {entries:1, _id:0})
    res.send(userData)
})

module.exports = router