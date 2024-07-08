import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProps from "../types/UserProps";

const useFetchUser = (id: string) => {

    const [user, setUser] = useState<UserProps>({
        name: id === "host"  ? "host" : "Načítání...",
        username: "host",
        profilePicSrc: "https://res.cloudinary.com/dynjmtw8a/image/upload/v1720293279/ybsesmgjvxmvt4wmglvy.jpg"
    })

    if (id === "host") {
        return {user, setUser}
    }
    
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {

                if (!id) {
                    throw new Error();
                }
                
                const response = await fetch(
                    `http://localhost:3000/api/users/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status != 200) {
                    throw new Error();
                }

                const data: UserProps = (await response.json()).user;
                setUser(data);
            } catch(err) {
                navigate("/login");
            }
        }
        fetchUser();
    }, [])

    return {user, setUser};
}

export default useFetchUser;