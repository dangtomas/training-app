import User from "@/models/User";
import dbConnect from "@/db/dbConnect";

dbConnect();

export default async function Members() {
    const users = await User.find({}).sort("name");

    return <h1>Test members</h1>;
}
