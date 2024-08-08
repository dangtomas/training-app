import Week from "@/models/Week";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const week = await Week.findById(params.id);
    return Response.json(week, { status: 200 });
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } },
) {
    const reqBody = await req.json();
    const week = await Week.findByIdAndUpdate({ _id: params.id }, reqBody, {
        new: true,
    });

    return Response.json(week, { status: 200 });
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } },
) {
    await Week.findByIdAndDelete(params.id);
    return Response.json({}, { status: 200 });
}
