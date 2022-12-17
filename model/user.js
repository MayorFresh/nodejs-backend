const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//this is where we create our schema
/*
model is where we view 
is point of interaction with the database
use module.export() to export the user schema
*/
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(email) {
            if(!validator.isEmail(email)){
                throw new Error ("Enter a Valid Email Address")
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        default: 0
    },
    phoneNumber: {
        type: String,
        // required: true,
        trim: true,
        unique: true,
        length: {min: 11, max: 11},
        validate(value){
            if(value.length === 0){
                throw new Error("please enter a valid Nigeria phone number")
            }
        }
    },
    password: {
        type: String,
        // required: true,
        trim: true,
        // unique: true,
        length: {min: 8},
        validate(value){
            if(value.length === 0){
                throw new Error("Enter a password to proceed")
            }
        }
    },
    address: {
        type: String,
        // required: true,
        trim: true,
    },
    token: {
        type: String
    }
}, {timestamps: true})

//for hashing of password
// userSchema.pre('save', async function(next) {
//     const user = this

//     if(user.password){
//         const hashpass = await bcrypt.hash(user.password, 10)
//         user.password = hashpass
//         console.log("hash successful")
//     }

//     next()
// });

const User = mongoose.model("newusers", userSchema)

// to export the user schema
module.exports = User

