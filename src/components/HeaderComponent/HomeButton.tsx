"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";

export default function HomeButton() {
    const router = useRouter();
    return (
        <>
            <Script
                src="https://kit.fontawesome.com/651d93916d.js"
                crossOrigin="anonymous"
            />
            <button
                type="button"
                onClick={() => {
                    router.push("/");
                }}
            >
                <i className="fa-solid fa-house px-2.5 text-xl hover:text-stone-800"></i>
            </button>
        </>
    );
}
