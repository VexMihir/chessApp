// Author: gitdagray
// Code file: register.js
// Time: Sept 30 2021
// Source: https://github.com/gitdagray/user_auth/blob/main/routes/register.js

const express = require('express')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.post('/', registerController.handleNewUser)

module.exports = router;