const express = require('express')
const ToDo = require('../model/todo')

const router = express.Router()

//todo creation endpoint
//create a todo
//save a todo
// save to database
//

router.post('/createtodo', (req, res) => {
    const newTodo = new ToDo(req.body)
    newTodo.save().then(() => {
        res.status(201).send({success: "Todo created successfully"})
        console.log(newTodo)
    }).catch((e) => {
        res.status(500).send({fail: "could not create"})
        console.log(e)
    })
})

router.get('/readtodo/:id', (req, res) => {
    const todo_Id = req.params.id

    ToDo.findById(todo_Id).then((todo) => {
       res.status(201).send(todo)
       console.log(todo)
    }).catch((e) => {
        res.status(500).send({error: "could not fetch todo"})
        console.log(e)
    })
})

router.delete('/readtodo/:id', (req, res) => {
    ToDo.findByIdAndDelete(req.params.id).then((todo) => {
        if (!todo){
            res.status(404).send({fail: "could not get todo or has been deleted"})
        } else{
            res.status(201).send({success: "todo deleted successfully"})
            console.log(todo)
        }
    }).catch((e) => {
        res.status(500).send({fail: "failed to delete"})
    })
})

//update
router.patch('/readtodo/:id', (req, res) => {
    // ToDo.findByIdAndUpdate(req.params.id, req.body,  {new: true})   =---- A new short method
    ToDo.findByIdAndUpdate(req.params.id, {
        description: req.body.description,
        completed: req.body.completed
    }, {useFindAndModify: true, new: true})
    .then((todo) => {
        if (!todo){
            res.status(404).send({fail: "unable to access todo"})
        }else{
            res.status(201).send(todo)
            console.log(`update successful \n ${todo}`)
        }
    }).catch((e) => {
        res.status(500).send({fail: "error"})
        console.log(e)
    })
})

//get all users
router.get('/alltodo', (req, res) => {
    ToDo.find({}).then((allTodo) => {
        res.status(201).send(allTodo)
        console.log(allTodo)
    }).catch((e) => {
        res.status(500).send({fail: "error"})
        console.log(e)
    })
})

module.exports = router