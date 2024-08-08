import User from "@/models/User";
import dbConnect from "@/db/dbConnect";

dbConnect();

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const user = await User.findById(params.id);
    return Response.json(user, { status: 200 });
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } },
) {
    const reqBody = await req.json();
    const user = await User.findByIdAndUpdate({ _id: params.id }, reqBody, {
        new: true,
    });
    if (reqBody.password) {
        user?.save();
    }
    return Response.json(user, { status: 200 });
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
) {
    await User.findByIdAndDelete(params.id);
    return Response.json({}, { status: 200 });
}
