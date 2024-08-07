"use server";
import User from "@/models/User";
import { cookies } from "next/headers";

export default async function editProfile(formData: FormData) {
    const data = {
        name: formData.get("name"),
        password: formData.get("password"),
    };

    const userId = cookies().get("id")?.value;
    if (userId === "66b3e5534bbc76f3225afb05") {
        throw new Error("Unauthorized operation.");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        data.password ? data : { name: data.name },
        { new: true },
    );
    if (data.password) {
        user?.save();
    }
}
