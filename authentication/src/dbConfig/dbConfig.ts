import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected")
        })

        connection.on('error',(err) =>{
            console.log("MongoDB connection error: "+ err);
        })

        process.exit();
    } catch(error){
        console.log("Error while connecting to DB");
        console.log(error);
    }
}