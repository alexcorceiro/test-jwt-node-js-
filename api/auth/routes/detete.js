const authService = require("../../service/authService")

exports.deleteUser = async (req, res, next ) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: "missing id"})
    }

    try{
        const user = await authService.getUserByIdAndDelete(id)

        if(!user) {
            return res.status(404).json({
                message: "could not delete user",
                error: "user not found"
            })
        }

        return res.status(200).json({
            message: "user deleted succes",
            user
        })
    }catch(err){
        return res.status(409).json({
            message: "user not deleted", 
            error: err.message
        })
    }
} 