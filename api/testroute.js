const { signedCookie } = require("cookie-parser")
const express = require("express")
const routerTest = express.Router()


routerTest.route('/test').get((req, res) => res.send("get enpoint from testroute "))

module.exports = { routerTest}