const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')


//Creates user for testing purposes

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


//Add entry

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

//Get data

router.get('/users', async (req, res) => {
    const accountId = req.query.accountId
    const userData = await schemas.Users.find({id:accountId}, {entries:1, _id:0, })
    res.send(userData)
})

//Check if able to create account

router.get('/signup', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    const confirmPassword = req.query.confirmPassword
    const userExist = await schemas.Users.exists({ username:username, password:password });
    console.log(username)
    console.log(password)
    console.log(confirmPassword)
    if (userExist)
        return res.send("User already exists");
    if(password.length < 8)
        return res.send("Password must be at least 8 characters")
    if(password != confirmPassword)
        return res.send("Passwords do not match")
    res.send("success")
})

//Create Account

router.post('/signup', async (req, res) => {
    const username = req.query.username
    const password = req.query.password

    const userInfo = {
        username: username,
        password: password,
    }
    const newUser = new schemas.Users(userInfo)
    await newUser.save()
    .then(function (user) {
        console.log(user._id)
        res.send(user._id)
      })
      .catch(function (err) {
        console.log(err)
      });
})

//Login

router.get('/login', async (req, res) => {
    const {username, password} = req.body
    const userId = await schemas.Users.find({username: username, password: password}, {_id:1})
    res.send(userId)
})

module.exports = router