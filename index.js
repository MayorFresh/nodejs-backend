const express = require('express')
const path = require('path')
const chalk = require('chalk')
const userRouter = require('./routers/user')
const user = require('./routers/user2')
const todoRouter = require('./routers/todo')
const bodyParser = require('body-parser')



// it will run mongoose directly from the file 
require('./db/mongoose') 

// Creating an express application
const app = express()

const pathToView = path.join(__dirname, "src/views")
const pathToStyle = path.join(__dirname, "public/css")
const pathToImage = path.join(__dirname, "public/img")
const pathToJs = path.join(__dirname, "public/js")
const pathToVendor = path.join(__dirname, "public/vendors")

app.set('views', pathToView)
app.use(express.static(pathToView))
app.use(express.static(pathToStyle))
app.use(express.static(pathToImage))
app.use(express.static(pathToJs))
app.use(express.static(pathToVendor))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

//to run the userRouter
app.use(express.json())

// app.use( userRouter)
app.use(user)

app.use(todoRouter)





app.get('/', (req, res) => res.sendFile(pathToView + "/homepage.html"))

app.get('/sign-in', (req, res) => res.sendFile(pathToView + "/sign-in.html"))

app.get('/sign-up', (req, res) => res.sendFile(pathToView + "/sign-up.html"))

app.post('/sign-in', (req, res) => res.send({name: "My first post method"}))


// Creating an Endpoint to test express
// https://heroku.com/article

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('homepage.html')
})
// app.get('/', (req, res) => res.send({Hooray: "you just used express load on endpoint"}))

//it takes 2 args (request, response)
app.get('/info', (end, start) => {
    start.send({
        Name: "BAckend",
        Developer: "Mayorfresh",
        Description: "Express",
        Dependencies: "Expess, Chalk",
        Version: "1.0.0",
        endpoints: "sign-in, sign-up",
        port: "4000"
    })
})


//it takes 2 args (port, callbackfunction)
app.listen(4000, () => console.log(chalk.blue("Your resquest server is running on port 4000")))
