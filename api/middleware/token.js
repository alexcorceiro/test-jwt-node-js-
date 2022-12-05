const jwt = require("jsonwebtoken")
require("dotenv").config();

const checkCookie = (req) => {
    console.log("all our cookies are:", req.cookies)

    return req.cookies['jwt']
}

const verifyAccesToken = (req, res , next ) => {
    let token;

    if(req.hearders.authization && req.headers.authization.startsWith("Bearer")) {
       token = req.headers.authization.split(' ')[1]
       
       console.log({ token})
    }else {
        token = req.hearders["x-access-token"] || checkCookie(req) || null

        console.log({ token })
    }


    if(! token) {
        return res.status(403).send("a token is required for authentification")
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.user = decoded
    }catch(err){
        return res.status(401).send("invalid token")
    }
    return next()
}

module.exports = verifyAccesToken;