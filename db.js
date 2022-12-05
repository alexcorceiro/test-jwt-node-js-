const mongoose = require("mongoose")
const localDB = "lien vers mongodb"

const connectDB = () => {
    try{
        mongoose.connsect(localDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("mongodb connected.....")
    }catch(err){
        console.log(err.message);
        process.exit(1)
    }
}

module.eports = connectDB;