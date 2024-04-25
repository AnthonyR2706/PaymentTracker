const express = require('express')
const router = express.Router()

router.post('/contact', (req,res) => {
    const {name, job, test} = req.body
    console.log(name + "|" + job + '|' + test)
    res.send('Message Sent')
})

router.get('/users', (req, res) => {
    const userData = 
    [
        {
            "name": "a",
            "job": "c",
            "test": "e"
        },
        {
            "name": "b",
            "job": "d",
            "test": "e"
        }
    ]
    res.send(userData)
})

module.exports = router