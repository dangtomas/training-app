import User from "@/models/User";
import { cookies } from "next/headers";
import PlayerCardBig from "@/components/PlayerCards/PlayerCardBig";
import dbConnect from "@/db/dbConnect";
import MenuTab from "@/components/MenuTab";
import Link from "next/link";

dbConnect();

export default async function Home() {
    const user = await User.findById(cookies().get("id")?.value);
    const menuItems = [
        {
            logo: "🏋️‍♂️",
            name: "TRÉNINKY",
            to: "/trainings",
        },
        {
            logo: "📊",
            name: "TABULKY",
            to: "/tables",
        },
        {
            logo: "📅",
            name: "TÝDNY",
            to: "/weeks",
        },
        {
            logo: "👨‍👩‍👧‍👦",
            name: "ČLENOVÉ",
            to: "/members",
        },
        {
            logo: "💵",
            name: "CENY",
            to: "/prices",
        },
        {
            logo: "✏️",
            name: "UPRAVIT",
            to: "/edit",
        },
    ];

    return (
        <div className="mt-24 flex flex-col">
            <div className="box">
                <PlayerCardBig
                    name={user.name}
                    profilePicSrc={user.profilePicSrc}
                />
                {menuItems.map((menuItem) => {
                    return (
                        <MenuTab
                            name={menuItem.name}
                            logo={menuItem.logo}
                            to={menuItem.to}
                            key={menuItem.name}
                        />
                    );
                })}
            </div>
            <Link href="/login" className="m-auto pt-5 text-red-500">
                Odhlásit se
            </Link>
        </div>
    );
}
