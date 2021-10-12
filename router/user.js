const chalk = require('chalk')
const express = require('express')
// const mongoose = require('../')
const User = require("../model/user")
// const userModel = require('../model/user')

const router = express.Router()

//Create a new User
router.post('/newUser', (req, res) => {
    //we are accessing what the user entered from userModel and pass it to the "const user" data
    const user = new User(req.body)

    //to save the data that has been passed into user
    user.save().then(() => {
        res.status(201).send({save: "User Created successfully", user})
        console.log(user)
    }).catch((error) => {
        res.status(500).send({fail: "could not create user"})
        console.log(error)
    })
})


//to get a single user data by id 

router.get("/user/:id", (req, res) => {
    const _id = req.params.id
    console.log(_id)


    User.findById(_id).then((user) => {
        res.status(200).send({user}) //it sends the data to postman
        console.log(chalk.green('user Located'))
        console.log(user) //it sends the data to the console
    }).catch((error) => {
        res.status(500).send({fail: "could not fetch user data"})
        console.log(error)
    })
})

//to delete a user by id
router.delete("/deleteUser/:id", (req, res) => {
    const _id = req.params.id
    console.log(_id)


    User.findByIdAndDelete(_id).then((user) => {
        if(!user){
            res.status(404).send({error: "user does not exist or has been deleted"})
        }else{
            res.status(200).send(`User Deleted Sucessful`)
            // res.send({user}) //it sends the data to postman
            console.log(chalk.bgGreen.red(`${user.firstName} with ${user.email} deleted successfully `)) //it sends the data to the console
        }
    }).catch((error) => {
        res.status(500).send({fail: "could not delete user data"})
        console.log(error)
    })
})

// to update a user by id
// router.patch("/updateUser/:id", (req, res) => {
//     const _id = req.params.id
//     console.log(_id)

//     User.findByIdAndUpdate(req.params.id, {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         age: req.body.age,
//         phoneNumber: req.body.phoneNumber,
//         password: req.body.password,
//         address: req.body.address
//     }, {useFindAndModify: true, new: true})
//     .then((user) => { 
//         res.send(`Update Successful`)
//         // res.send({user});
//         console.log(`Update successfully`)
//     }).catch((error) => {
//         res.status(500).send({fail: "could not delete user data"})
//         console.log(error)
//     });
// })

router.patch('/user/:id', (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const validUpdates = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address']
    const isValidUpdate = updates.every((update) => validUpdates.includes(update))
    if(!isValidUpdate){
       res.status(400).send({error: "You can't update the selected fields"})
    }

    try{
       User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        // updates.forEach((update) => req.user[update] = req.body[update])
        .then((user) => {
            res.status(200).send(user)
            // console.log(user)
        }).catch((e) => {
            res.status(400).send({fail: "could not update user"})
        })
    }
    catch(e){
        res.status(500).send({fail: "Something went wrong"})
        console.log(e)
    }
})

//fetching all users
router.get('/allUsers', (req, res) => {
    allUsers = User.find({}).then((allUsers) => {
    if(!allUsers){
        res.status(404).send({empty: "no user(s) found"})
    }else if(allUsers == 0){
        res.status(202).send({Empty: "No user found, database is empty"})
    }
    else{
        res.status(200).send({allUsers})
        console.log("Successfully Fetched all users")
    }
    }).catch((err) => {
        res.status(500).send({error: "connot fetch all users due to bad request"})
        console.log(err)
    })
})




module.exports = router