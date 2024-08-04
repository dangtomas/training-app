"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function cancelFormLink() {
    const router = useRouter();
    return (
        <div className="flex w-full justify-center">
            <Link className="mt-auto text-sky-500" href="/trainings">
                Zrušit
            </Link>
        </div>
    );
}
