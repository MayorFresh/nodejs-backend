const express = require('express')
const ToDo = require('../model/todo')

const router = express.Router()

//todo creation endpoint
//create a todo
//save a todo
// save to database
//

router.post('/createtodo', async (req, res) => {
    const newTodo = new ToDo(req.body)
    try {
        const todo = await newTodo.save()
        res.status(201).send({success: "Todo created successfully"})
        console.log(todo)
    } catch(e) {
        res.status(500).send({fail: "could not create"})
        console.log(e)
    }

})

router.get('/readtodo/:id', async (req, res) => {
    const todo_Id = req.params.id
    try {
        const gettodo = await ToDo.findById(todo_Id)
        res.status(201).send(gettodo)
       console.log(gettodo)
    } catch (e) {
        res.status(500).send({error: "could not fetch todo"})
        console.log(e)
    }
})

router.delete('/readtodo/:id', async (req, res) => {

    try {
        const deltodo = await ToDo.findByIdAndDelete(req.params.id)
        if (!deltodo){
            res.status(404).send({fail: "could not get todo or has been deleted"})
        } else{
            res.status(201).send({success: "todo deleted successfully"})
            console.log(deltodo._id, "has been deleted")
        }
    } catch (e)  {
        res.status(500).send({fail: "failed to delete"})
    }
})

//update
router.patch('/readtodo/:id', async (req, res) => {
    // ToDo.findByIdAndUpdate(req.params.id, req.body,  {new: true})   =---- A new short method
    try {
        const uptodo = await ToDo.findByIdAndUpdate(req.params.id, req.body,  {new: true})
        if (!uptodo){
            res.status(404).send({fail: "unable to access todo"})
        }else{
            res.status(201).send(uptodo)
            console.log(`update successful \n ${uptodo}`)
        }
    } catch (e) {
        res.status(500).send({fail: "error"})
        console.log(e)
    }
    // ToDo.findByIdAndUpdate(req.params.id, {
    //     description: req.body.description,
    //     completed: req.body.completed
    // }, {useFindAndModify: true, new: true})
    
})

//get all users
router.get('/alltodo', async (req, res) => {
    
    try {
        const alltodo = await ToDo.find({})
        res.status(201).send(alltodo)
        console.log(alltodo)
    } catch (e) {
        res.status(500).send({fail: "error"})
        console.log(e)
    }
})

module.exports = router