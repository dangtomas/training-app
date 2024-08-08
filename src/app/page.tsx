"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import PlayerCardBig from "@/components/PlayerCards/PlayerCardBig";
import MenuTab from "@/components/MenuTab";
import Loading from "@/components/Loading";
import fetchUser from "@/utils/api/fetchUser";
import User from "@/types/User";

export default function Dashboard() {
    const menuItems = [
        {
            logo: "🏋️‍♂️",
            name: "TRÉNINKY",
            to: "/trainings",
        },
        {
            logo: "📊",
            name: "TABULKY",
            to: "/trainings",
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
    const [user, setUser] = useState<User>();
    useEffect(() => {
        fetchUser(getCookie("id")!).then((result) => {
            setUser(result);
        });
    }, []);

    return !user ? (
        <Loading />
    ) : (
        <div className="mt-32 flex flex-col">
            <div className="box">
                <PlayerCardBig
                    name={user!.name}
                    profilePicSrc={user!.profilePicSrc}
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
