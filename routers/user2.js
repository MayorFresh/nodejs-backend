const express = require('express')
const router = express.Router();


const {signup, signin, allUsers, edituser, deleteuser} = require('../controller/user')

router.route('/signup').post(signup)    //create user route
router.route('/signin').post(signin)    //login route
router.route('/').get(allUsers) //fetch all users route
router.route('/user/:id').patch(edituser).delete(deleteuser)


module.exports = router 