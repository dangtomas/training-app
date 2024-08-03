import Week from "@/models/Week";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET(req: Request) {
    const weeks = await Week.find({}).sort("from");
    return Response.json(weeks, { status: 200 });
}

export async function POST(req: Request) {
    const week = await Week.create(await req.json());
    return Response.json(week, { status: 200 });
}
