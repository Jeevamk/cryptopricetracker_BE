import mongoose from "mongoose";

const database = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected`);
}

export default database;