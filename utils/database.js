import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongoose db already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
    } catch (error) {
        console.log(error)
    }
}