const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
// const chalk = require('chalk')
// const express = require('express')

//Signup
const signup = async(req, res) => {
    //we are accessing what the user entered from userModel and pass it to the "const user" data
    //to save the data that has been passed into user
    try {
        // get user input
        // const user = new User(req.body) 
        const {firstName, lastName, email, password, phoneNumber, address, age} = User(req.body)   
        
        //to validate the user input
        if (!(email && password && firstName && lastName && phoneNumber && address)) {
            res.status(400).send("All input is required");
            console.log("All input is required")
        }

        //to check if the person is a registered user in the database
        const oldUser = await User.findOne({email})

        if (oldUser) {
            return res.status(409).send("User already exists. Please Login")
        }

        //to encrypt the user password
        encryptedpassword = await bcrypt.hash(password, 10);

        //to create a user in the database
        const user = await User.create({
            firstName, lastName, phoneNumber, address, age, email,
            password: encryptedpassword
        })

        //to create token
        const token = jwt.sign({user_id: user._id, email}, 
            //token key (meant to be private and kept in env)
            process.env.TOKEN_KEY,   
            {expiresIn: "2h"}
        )

        //to save the token
        user.token = token;

        //to return new user
        res.status(201).json(user)
        console.log("User Registered successfully")
        // res.redirect("sign-in.html")
    } catch(e) {
        res.status(500).send({fail: "user not saved"})
        console.log(e)
    }
}


//Login
const signin = async (req, res) => {
    try {
        //get the user input
        const {email, password} = User(req.body)

        //validate the user input
        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        // Validate is the user exist in the database
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).send("invalid email")
        }

        //decrypting the user password
        const userpassword = await bcrypt.compare(password, user.password)
        if (user && userpassword) {

            //create login token
            const token = jwt.sign({user_id: user._id, email },
                process.env.TOKEN_KEY,
                {expiresIn: "2h"}
            )

            //save token
            user.token = token  

            //to display the user
            res.status(200).json(user)
            console.log(user.email + " Login Successful")
        } 
        else {
            res.status(400).send("Invalid Login details")
        }
        

    }
    catch (e) {
        console.log(e)
    }
}

//Get all registered users

const allUsers = async (req, res) => {
    try {
        const allUsers = await User.find({})
        if(!allUsers){
            res.status(404).send({empty: "no user(s) found"})
        }else if(allUsers == 0){
            res.status(202).send({Empty: "No user found, database is empty"})
        }
        else{
            res.status(200).send({allUsers})
            console.log("Successfully Fetched all users")
        }
    } catch(err) {
        res.status(500).send("connot fetch all users due to bad request")
        console.log(err)
    }
}

//learn how to update a password and also encrypt it 

//Update user details
const edituser = async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const validUpdates = ['firstName', 'lastName', 'phoneNumber', 'address']
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
        res.status(500).send( "Something went wrong")
        console.log(e)
    }
}


//Delete a user from the database
const deleteuser = async (req, res) => {
    const _id = req.params.id
    console.log(_id)

    try {
        const user = await User.findByIdAndDelete(_id)
            if(!user){
                res.status(404).send({error: "user does not exist or has been deleted"})
            }else{
                res.status(200).send(`User Deleted Sucessful`)
                // res.send({user}) //it sends the data to postman
                console.log(chalk.bgGreen.red(`${user.firstName} with ${user.email} has been deleted successfully `)) //it sends the data to the console
            }
        
    } catch(error) {
        res.status(500).send("could not delete user data")
        console.log(error)
    }
}

module.exports= {signup, signin, allUsers, edituser, deleteuser}