const mongoose = require('mongoose');

const standupschema = new mongoose.Schema({
    productname:{ type : String},
    productid:{ type : String},
    productprice:{ type : String},
    department:{ type : String},
    manufacdate:{ type : String},
    barcode:{ type : Date,default:Date.now}
})

module.exports = mongoose.model('Standup',standupschema)