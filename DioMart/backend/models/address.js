const mongoose = require('mongoose');
const validator = require('validator');


const addressSchema = new mongoose.Schema({

    ip: {
        type: String,
        required: true,
        unique: true
         
    },
    city: {
        type: String,
        required: true
         
    },
    countryName: {
        type: String,
        required: true
         
    },
    capital: {
        type: String,
        required: true
         
    }
 

})

module.exports=mongoose.model('Address',addressSchema);