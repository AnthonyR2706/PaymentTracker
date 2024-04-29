const mongoose = require('mongoose')
const Schema = mongoose.Schema


const entriesSchema = new Schema({
    invoiceId: {type:Number, required:true},
    client: {type:String, required:true},
    description: {type:String},
    date: {type:Date, default:Date.now},
    price: {type:Number, required:true},
    payed: {type:Number}
})

const userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    id: {type:Number, required:true},
    entryDate: {type:Date, default:Date.now},
    entries: [
        entriesSchema
    ]
})



const Users = mongoose.model('Users', userSchema, 'users')

const mySchemas = {'Users':Users}

module.exports = mySchemas