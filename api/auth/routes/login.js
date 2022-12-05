const authService = require("../../service/authService.js")

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if(! username || !password) {
        return res.status(400).json({ message: "username or password "})
    }

    try{
        const { user, validPassword, token, maxAge } = await authService.loginUser(username, password)

        if(!user){
            return res.status(401).json({
                message: "login not successful",
                error: "User not found"
            })
        }

        if(!validPassword){
            return res.status(401).json({
              message: "login not succesful",
              error: "password is incorrect"  
            })
        }

        res.cookie("jwt", token, {
            httpOnly: true,
            maxage : maxAge * 1000
        })

        return res.status(200).json({
            message: "login successful",
            user,
        })
    }catch(err){
        res.status(401).json({
            message: "login not successful",
            error: err.message
        })
    }
}