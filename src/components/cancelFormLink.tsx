"use client";

import Link from "next/link";

export default function cancelFormLink(props: { href: string }) {
    return (
        <div className="flex w-full justify-center">
            <Link
                className="mt-auto text-sky-500"
                href={props.href}
                prefetch={true}
            >
                Zrušit
            </Link>
        </div>
    );
}
