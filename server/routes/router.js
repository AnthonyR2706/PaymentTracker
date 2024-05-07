const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')


router.post('/contact', async (req, res) => {
    const userInfo = {
        username:"user",
        password:"hunter2",
        id:1,
        // entries:[{
        //     invoiceId: 1,
        //     client: "Brother",
        //     description: "For Fun",
        //     price: 10,
        //     paid: 5
        // }]
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
    const entryInfo = {
        invoiceId: invoiceId,
        client: client,
        description: description,
        price: price,
        paid: paid
    }
    const newEntry = new schemas.Entries(entryInfo)
    const validate = newEntry.validateSync()
    if(validate != undefined){
        var errMessage = '';
        for (var errName in validate.errors) {
            errMessage += validate.errors[errName].message + "\n"
        }
        res.send(errMessage)
        res.end()
        return
    }
    const x = await schemas.Users.findOneAndUpdate(
        { id: 1 },
        {
            $push: {
                "entries": newEntry,
            },
        },
        { new: true },
    );
    res.send("Entry Added")
    res.end()
})

router.get('/users', async (req, res) => {
    const userData = await schemas.Users.find({}, {entries:1, _id:0})
    res.send(userData)
})

module.exports = router