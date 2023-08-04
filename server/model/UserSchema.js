const mongoose = require('mongoose')
//Source: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String
    }
)

module.exports = userSchema