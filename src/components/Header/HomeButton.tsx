"use client";

import Link from "next/link";

export default function HomeButton() {
    return (
        <>
            <Link href="/">
                <i className="fa-solid fa-house px-2.5 text-xl hover:text-stone-800"></i>
            </Link>
        </>
    );
}
