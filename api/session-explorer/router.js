const express = require("express")
const router = express.Router()
const verifyAccesToken = require("../middleware/token")

router.route("/cookie").get((req, res) => {
    console.log('cookie:', req.cookies)
    res.status(200).json({
        cookies: red.cookies
    })
})

router.route("/token").post( verifyAccesToken, (req,res) => {
    res.status(200).send("token corret: access granted !")
})

module.exports= router