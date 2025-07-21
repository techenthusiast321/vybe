import mongoose from "mongoose";

const connectDb = async () => {

    try{

        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");

    }
    catch(err){
        console.error("Error connecting to the database:", err);
    }

}

export default connectDb;