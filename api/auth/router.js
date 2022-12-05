const express = require("express")
const router = express.Router()
const { login } = require("./routes/login")
const { register } = require("./routes/register")
const { updateUserToAdmin } = require("./routes/update")
const { deleteUser } = require("./routes/detete")

const verifyAccesToken = require("../middleware/token")
const checkAdmin = require("../middleware/checkAdmin")

router.route("/register").post(register)
router.route("/register").get((req, res) => res.send("hello word"))
router.route("/login").post(login)
router.route('/deletuser').delete(deleteUser)
router.route("/updateuser/:id").put(updateUserToAdmin)

router.use(verifyAccesToken)
router.use(checkAdmin)

module.exports = router;