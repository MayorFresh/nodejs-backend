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
}, {timestamps: true})

todoSchema.pre('save', async (next) => {
    if(todoSchema){
        console.log("running this code before todo")
    }
    next()
})

const ToDo = mongoose.model('ToDo', todoSchema)
module.exports = ToDo