const authService = require("../../service/authService")

exports.register = async (req, res, next) => {
    
    const { username, password } = req.body

    const oldUser = await authService.getUserByUsername(username)

    console.log({ oldUser})

    if(oldUser){
        return res.status(409).send("user already exists")
    }

    if(password.length < 8 ){
        return res.status(400).json({ message : "le mot de passe dois avoir 8 caractère min"})
    }

    try{
        const { newUser , token, maxAge } = await authService.registerUser(
            username, 
            password
        )

        res.cookie("jwt", token, {
            httpOnly : true,
            maxAge: maxAge * 1000
        })

        return res.status(201).json({
            message: "user creted succes", 
            newUser
        })
    }catch(err){
        return res.status(401).json({
            message: "user not created",
            error: err.message
        })
    }
}