import User from "@/models/User";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET() {
    const users = await User.find({}).sort("name");
    return Response.json(users, { status: 200 });
}

export async function POST(req: Request) {
    const user = await User.create(await req.json());
    return Response.json(user, { status: 200 });
}