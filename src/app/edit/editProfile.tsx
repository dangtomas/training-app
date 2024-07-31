"use server";
import User from "@/models/User";
import { cookies } from "next/headers";

export default async function editProfile(formData: FormData) {
    const data = {
        name: formData.get("name"),
        password: formData.get("password"),
    };

    const user = await User.findByIdAndUpdate(
        cookies().get("id")?.value,
        data.password ? data : { name: data.name },
        { new: true },
    );
    if (data.password) {
        user?.save();
    }
}
