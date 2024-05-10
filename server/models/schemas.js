const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
    invoiceId: {type:Number, required:[true, "Please enter an Invoice Id as a number"]},
    client: {type:String, required:[true, "Please enter a client"]},
    description: {type:String, default:""},
    date: {type:Date, default:Date.now},
    price: {type:Number, required:[true, "Please enter a price as a number"]},
    paid: {type:Number, required:[true, "Please enter the amount paid as a number"]}
}, { _id : false })

const userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    id: {type:Number, required:true},
    curInvoiceId: {type:Number, default:0},
    entryDate: {type:Date, default:Date.now},
    entries: [
        entrySchema
    ]
})



const Users = mongoose.model('Users', userSchema, 'users')
const Entries = mongoose.model('Entries', entrySchema, 'entries')

const mySchemas = {'Users':Users, 'Entries':Entries}

module.exports = mySchemas