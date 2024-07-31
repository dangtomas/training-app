import { useEffect, useState } from "react";
import User from "@/types/User";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function useFetchUser(id: string) {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        name: "",
        username: "",
        profilePicSrc: "",
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                });
                if (response.status != 200) {
                    throw new Error("Failed to fetch data.");
                }

                const data: User = await response.json();
                setUser(data);
            } catch (err) {
                router.push("/login");
                alert("Někde došlo k chybě ❌🙁");
            }
        }

        fetchUser();
    }, []);

    return { user, setUser };
}
