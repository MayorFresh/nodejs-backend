const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

//to nme your collection name

const ToDo = mongoose.model('ToDo', todoSchema)
module.exports = ToDo