const mongoose = require('mongoose')
const Schema = mongoose.Schema


const entrySchema = new Schema({
    invoiceId: {type:Number, required:true},
    client: {type:String, required:true},
    description: {type:String, default:""},
    date: {type:Date, default:Date.now},
    price: {type:Number, required:true},
    paid: {type:Number, default:0}
})

const userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    id: {type:Number, required:true},
    entryDate: {type:Date, default:Date.now},
    entries: [
        entrySchema
    ]
})



const Users = mongoose.model('Users', userSchema, 'users')
const Entries = mongoose.model('Entries', entrySchema, 'entries')

const mySchemas = {'Users':Users, 'Entries':Entries}

module.exports = mySchemas