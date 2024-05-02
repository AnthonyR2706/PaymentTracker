const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.post('/contact', async (req,res) => {
    const {name, job, test} = req.body
    const userInfo = {
        username:"user",
        password:"hunter2",
        id:1,
        entries:[{
            invoiceId: 1,
            client: "Brother",
            description: "For Fun",
            price: 10,
            payed: 5
        }]
    }
    const newUser = new schemas.Users(userInfo)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("worked")
    }
    res.end()
})

router.get('/users', async (req, res) => {
    const userData = await schemas.Users.find({}, {entries:1, _id:0})
    // const userData = 
    // [
    //     {
    //         "name": "a",
    //         "job": "c",
    //         "test": "e"
    //     },
    //     {
    //         "name": "b",
    //         "job": "d",
    //         "test": "e"
    //     }
    // ]
    res.send(userData)
})

module.exports = router