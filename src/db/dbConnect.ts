import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch(err) {
        console.log("Cannot connect to database.");
        console.log(err);
        process.exit();
    }
}
