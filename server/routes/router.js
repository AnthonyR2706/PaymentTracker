const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')


router.post('/contact', async (req, res) => {
    const userInfo = {
        username:"userrrr",
        password:"hunter5",
        id:4,
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
    const {client, description, price, paid, accountId} = req.body
    schemas.Users.findOneAndUpdate(
        { id: accountId },
        {$inc: { "curInvoiceId": 1 }}
    ).exec()
    const query = schemas.Users.findOne(
        { id: accountId }
    )
    query.select('curInvoiceId -_id')
    const newInvoiceId = await query.exec()
    console.log(newInvoiceId.curInvoiceId)
    const entryInfo = {
        invoiceId: newInvoiceId.curInvoiceId,
        client: client,
        description: description,
        price: price,
        paid: paid
    }
    const newEntry = new schemas.Entries(entryInfo)
    const validate = newEntry.validateSync()
    if(validate != undefined){
        var errMessage = [];
        for (var errName in validate.errors) {
            errMessage.push(validate.errors[errName].message)
        }
        console.log(errMessage)
        res.send(errMessage)
        res.end()
        return
    }
    const x = await schemas.Users.findOneAndUpdate(
        { id: accountId },
        {
            $push: {
                "entries": newEntry,
            },
        },
        { new: true },
    );
    res.send("Entry Added")
    console.log("Entry Added")
    res.end()
})

router.get('/users', async (req, res) => {
    const accountId = req.query.accountId
    const userData = await schemas.Users.find({id:accountId}, {entries:1, _id:0, })
    res.send(userData)
})

router.post('/signup', async (req, res) => {
    const {username, password} = req.body
    const userInfo = {
        username: username,
        password: password,
        id:4,
    }
    const newUser = new schemas.Users(userInfo)
    const saveUser = await newUser.save()
    if(saveUser){
        res.send("worked")
    }
    res.end()
})
router.get('/login', async (req, res) => {
    const {username, password} = req.body
    const userId = await schemas.Users.find({username: username, password: password}, {_id:1})
    res.send(userId)
})

module.exports = router