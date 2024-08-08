"use client";

import { Dispatch, SetStateAction } from "react";
import { getCookie } from "cookies-next";
import { CldUploadWidget } from "next-cloudinary";
import updateProfilePic from "@/utils/api/updateProfilePic";

export default function UploadPicWidget(props: {
    setMessage: Dispatch<SetStateAction<string>>;
}) {
    return (
        <CldUploadWidget
            uploadPreset="vv63enoi"
            onSuccess={async (result) => {
                try {
                    await updateProfilePic(
                        getCookie("id")!,
                        (result.info as any).url,
                    );
                    props.setMessage("Úspěšně změněno 💪✅");
                } catch {
                    props.setMessage("Někde došlo k chybě ❌🙁");
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        className="mb-6 mt-[-25px] cursor-pointer px-6 text-sm text-sky-500"
                        onClick={(e) => {
                            e.preventDefault();
                            open();
                        }}
                    >
                        Nahrát obrázek
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
