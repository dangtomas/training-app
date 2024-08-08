"use client";
import { useRouter } from "next/navigation";

export default function MenuTab(props: {
    logo: string;
    name: string;
    to: string;
}) {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                if (props.name === "TRÉNINKY") {
                    localStorage.setItem("tables", "false");
                } else if (props.name === "TABULKY") {
                    localStorage.setItem("tables", "true");
                }
                router.push(props.to);
            }}
            className="flex w-full items-center justify-between border-t border-gray-400 text-lg hover:bg-stone-200"
        >
            <div className="px-4 py-2">
                <span className="pr-2">{props.logo}</span>
                <span>{props.name}</span>
            </div>
            <i className="fa-solid fa-arrow-right px-4 py-2"></i>
        </button>
    );
}
