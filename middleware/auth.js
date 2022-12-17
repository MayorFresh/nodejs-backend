const jwt = require('jsonwebtoken')
const User = require('../model/user')

const JWT_SECRET = 'signedbyMayorfresh'

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')// note this ('Bearer ', '') is different from this ('Bearer', '') because of the space in the quote 'Bearer '
        const decodedToken = jwt.verify(token, JWT_SECRET)
        // console.log  (`here is it ${token}`, `new token ${decodedToken}`)
        const user = User.findOne({ _id: decodedToken._id, "tokens.token": token})

        if(!user){
            throw new Error('unauthorized user!')
        }

        req.token = decodedToken;
        req.user = user;
        req.userID = user._id;
        next() // passing control to next function in the chain 
    }
    catch(e){
        res.status(500).send({fail: "user not saved"})
        console.log(e)
    }

 
}
 module.exports = auth;
