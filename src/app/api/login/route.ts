import User from "@/models/User";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function POST(req: Request) {
    const { username, password } = await req.json();
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
        return Response.json({ error: "Invalid authentication." }, { status: 400 })
    }

    const token = user.createJWT();

    return Response.json({ token, id: user._id }, { status: 200 });
}