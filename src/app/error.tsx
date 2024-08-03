"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="box mt-44 py-24 text-2xl">
            Někde došlo k chybě, zkus se{" "}
            <Link href="/login" className="text-sky-500 underline">
                odhlásit
            </Link>{" "}
            a přihlásit
        </div>
    );
}
