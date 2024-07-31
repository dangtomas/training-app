"use client";

import { getCookie } from "cookies-next";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

async function updateProfilePic(url: string) {
    await fetch(`api/users/${getCookie("id")}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePicSrc: url }),
    });
}

export default function UploadPicWidget() {
    const router = useRouter();
    return (
        <CldUploadWidget
            uploadPreset="vv63enoi"
            onSuccess={async (result) => {
                try {
                    await updateProfilePic((result.info as any).url);
                } catch (err) {
                    router.push("/login");
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        className="mb-6 mt-[-25px] cursor-pointer px-6 text-sm text-sky-500"
                        onClick={() => open()}
                    >
                        Nahrát obrázek
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
