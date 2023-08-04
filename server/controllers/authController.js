// Author: gitdagray
// Code file: authController.js
// Time: Sept 30 2021
// Source: https://github.com/gitdagray/user_auth/blob/main/controllers/authController.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('../model/UserSchema')

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are requried'})
    //Source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
    const User = mongoose.model("User", userSchema)
    // check for duplicate usernames in the db
    const foundUser = await User.findOne({username: user}).exec()
    
    if (!foundUser) return res.status(401).json({'message': 'Username does not exist'}) 

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        //create JWTs
        res.json({'success': `User ${user} is logged in!`})

    } else {
        res.status(401).json({'message': 'Wrong Password'})
    }
}

module.exports = {handleLogin}