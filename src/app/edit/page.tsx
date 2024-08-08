"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import PlayerCardBig from "@/components/PlayerCards/PlayerCardBig";
import UploadPicWidget from "@/components/UploadPicWidget";
import User from "@/types/User";
import editProfile from "../../utils/api/editProfile";
import fetchUser from "@/utils/api/fetchUser";
import Loading from "@/components/Loading";

export default function Edit() {
    const [message, setMessage] = useState("‎"); // empty character;
    const passwordRef = useRef<HTMLInputElement>(null);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setTimeout(() => {
            fetchUser(getCookie("id")!).then((result) => {
                setUser(result);
            });
        }, 300);
    }, []);

    return !user ? (
        <Loading />
    ) : (
        <form
            className="box mt-24 items-start"
            action={async (formData: FormData) => {
                try {
                    await editProfile(formData);
                    setMessage("Úspěšně změněno 💪✅");
                } catch {
                    setMessage("Někde došlo k chybě ❌🙁");
                } finally {
                    passwordRef.current!.value = "";
                }
            }}
        >
            <PlayerCardBig
                name={user.name}
                profilePicSrc={user.profilePicSrc}
            />
            <UploadPicWidget setMessage={setMessage} />
            <div className="w-full px-6 pb-4">
                <h3 className="text-xl font-bold">Přihlašovací jméno</h3>
                <span className="block pb-3">{user.username}</span>
                <h3 className="pb-1 text-xl font-bold">Jméno</h3>
                <input
                    className="w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="text"
                    defaultValue={user.name}
                    required
                    name="name"
                    minLength={4}
                />
                <h3 className="mt-4 pb-1 text-xl font-bold">Heslo</h3>
                <input
                    className="w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="password"
                    name="password"
                    minLength={4}
                    ref={passwordRef}
                />
                <button
                    type="submit"
                    className="mb-4 mt-8 w-full rounded-sm bg-black p-2 text-white hover:bg-stone-800"
                >
                    Změnit
                </button>
                <p className="py-1 text-center text-lg">{message}</p>
            </div>
        </form>
    );
}
