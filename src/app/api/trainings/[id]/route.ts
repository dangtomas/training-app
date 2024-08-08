import Training from "@/models/Training";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const training = await Training.findById(params.id);
    return Response.json(training, { status: 200 });
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } },
) {
    const reqBody = await req.json();
    const training = await Training.findByIdAndUpdate(
        { _id: params.id },
        reqBody,
        { new: true },
    );

    return Response.json(training, { status: 200 });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
) {
    await Training.findByIdAndDelete(params.id);
    return Response.json({}, { status: 200 });
}
