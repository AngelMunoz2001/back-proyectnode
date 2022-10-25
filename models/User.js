const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    address: {
        type: String,
        required: true,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    age: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    password :{
        type: String,
        required : true,
        minlength: 6
    }
    
})

module.exports = mongoose.model('User', userSchema)