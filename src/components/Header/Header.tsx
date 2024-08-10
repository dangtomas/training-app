import Image from "next/image";
import HomeButton from "./HomeButton";

export default function Header() {
    return (
        <>
            <div className="fixed top-0 flex w-screen items-center justify-between bg-[#def4d7] p-3">
                <Image
                    src="/header-logo.png"
                    width={160}
                    height={0}
                    className="h-auto w-40"
                    alt={"main header logo"}
                />
                <HomeButton />
            </div>
        </>
    );
}
