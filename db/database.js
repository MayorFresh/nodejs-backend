// const chalk = require('chalk')
// const mongo = require('mongodb')
// const mongoClient = mongo.MongoClient


// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'login'

// mongoClient.connect( connectionURL, { useNewURLParser: true, useUnifiedTopology: true}, (error, client) => {
//     if(error){
//         console.log(chalk.bgRed.white(`Error connecting to database: ${error}`))
//     }
//     else{
//         console.log(chalk.bgGreen.white(`Successfully connected to database`))
//     }


    
//     const db = client.db(databaseName)

//     // adding to the database

//     // db.collection('user').insertOne({class: "node", action: "dbconnect"}, (error, insert) => {
//     //     if(error){
//     //         console.log(chalk.redBright(`Insert Operation Failed`))
//     //     }
//     //     else {
//     //         console.log(chalk.greenBright(`Successfully Inserted`))
//     //     }
//     // })

//     //inserting many datas
//     // db.collection('assignment').insertMany([
//     //     {firstname: "faith", lastname: "akinola", age: 23},
//     //     {firstname: "Grace", lastname: "adeoye", age: 21},
//     //     {firstname: "ezeikel", lastname: "john", age: 19},
//     //     {firstname: "famuyiwa", lastname: "micheal", age: 26}
//     // ], (error, insert) => {
//     //     if(error){
//     //         console.log(chalk.redBright(`Insert Operation Failed`))
//     //     }
//     //     else {
//     //         console.log(chalk.greenBright(`Successfully Inserted`))
//     //     }
//     // })

//     db.collection('assignment').updateOne(
//         {firstname: "faith"}, {$set: {firstname: "MAYOWA"}}
//     ), (error, insert) => {
//         if(error){
//             console.log(chalk.redBright(`Insert Operation Failed`))
//         }
//         else {
//             console.log(chalk.greenBright(`Successfully Inserted`))
//         }
//     }

//     // db.collection('assignment').find()({}, () => {})

// })