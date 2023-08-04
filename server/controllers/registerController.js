// Author: gitdagray
// Code file: registerController.js
// Time: Sept 30 2021
// Source: https://github.com/gitdagray/user_auth/blob/main/controllers/registerController.js

const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = require('../model/UserSchema')

const handleNewUser = async (req, res) => {
    
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    //Source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
    const User = mongoose.model("User", userSchema)
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({username: user}).exec()

    if (duplicate) return res.status(409).json({'message': 'The username already exists.'}); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        //Source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
        const userInstance = new User({username: user, password: hashedPwd})
        //store the new user
        await userInstance.save()

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };