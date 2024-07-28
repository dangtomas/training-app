import Training from "@/models/Training";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET(req: Request) {
    console.log(req.headers.get("isAdmin"));
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    const trainings = await Training.find({
        date: {
            $gte: new Date(from ? from + "T00:00:00.000Z" : 
                                  "1000-01-01T00:00:00.000Z"),
            $lte: new Date(to ? to + "T23:59:59.999Z" : 
                                "3000-12-31T23:59:59.999")
        }})
        .sort("date");

    return Response.json(trainings, { status: 200 })
}

export async function POST(req: Request) {
    const training = await Training.create(await req.json());
    return Response.json(training, { status: 200 });
}