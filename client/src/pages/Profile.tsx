import { FormEvent, useRef, useState} from "react";
import PlayerCardBig from "../components/PlayerCardBig";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import UploadPicWidget from "../components/UploadPicWidget";
import useFetchUser from "../utils/useFetchUser";

function Profile() {
    const { user, setUser } = useFetchUser(localStorage.getItem("id")!)

    const passwordRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const body: {[k: string]: any} = {
            name: user.name
        };

        if (passwordRef.current!.value) {
            body.password = passwordRef.current!.value;
            console.log("here");
        }
        
        try {
            await fetch(
                `http://localhost:3000/api/users/${localStorage.getItem("id")}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
            })
            setMessage("Úspěšně změněno 💪✅");
            passwordRef.current!.value = "";
        } catch(err) {
            navigate("/login");
        }
    }

    return (
        <>
            <Header/>
            <form id="profile-form" onSubmit={handleSubmit}>
                <PlayerCardBig name={user.name} 
                            profilePicSrc={user.profilePicSrc} 
                            host={{isHost: false, removeHost: () => {}}}/>
                <UploadPicWidget />
                <h3>Přihlašovací jméno</h3>
                <span>{user.username}</span>
                <h3>Jméno</h3>
                <input type="text" value={user.name} required minLength={4}
                onChange={(e) => setUser({...user, name: e.target.value})}/>
                <h3>Nové heslo</h3>
                <input type="password" minLength={4} ref={passwordRef}/>
                <button type="submit" id="change-profile-button">Změnit</button>
                <p>{message}</p>
            </form>
        </>
    )
}

export default Profile;