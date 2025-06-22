    const mongoose = require('mongoose')
    const connectionString = "mongodb+srv://ashwan07:ashwan@cluster0.9z1mwtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    async function connectToDatabase(){
       await mongoose.connect(connectionString)
       console.log("connected to DB succesfully")
    }

    module.exports = connectToDatabase