// Author: gitdagray
// Code file: auth.js
// Time: Sept 30 2021
// Source: https://github.com/gitdagray/user_auth/blob/main/routes/auth.js

const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/', authController.handleLogin)

module.exports = router;