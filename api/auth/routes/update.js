const authService = require("../../service/authService")

exports.updateUserToAdmin = async ( req, res, next ) => {
    const id = req.params.id 

    if(!id){
        return res.status(400).json({ message: "missing id"})
    }
}