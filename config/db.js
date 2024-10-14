const mongoose = require("mongoose")

const mongodbUrl="mongodb+srv://bhavyawinsalways:68b051t8NXSYJskP@cluster0.vthip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mongodbUrl);
}

module.exports={connectDb}