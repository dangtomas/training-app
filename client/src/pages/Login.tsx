import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear()
    }, [])
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.status != 200) {
                console.log("error")
                throw new Error();
            }
            
            const data = await response.json();
            localStorage.clear();
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("id", data.id);

            setMessage("Úspěšné přihlášení, počkej chvíli ✅🥳");
            setTimeout(() => {
                navigate("/");
            }, 500)
        } catch (err) {
            setMessage("Špatné údaje, zkus to znova ❌🙁");
        }
    }

    return (
        <>
        <Header />
        <div id="login-form-wrap">
            <form id="login-form" onSubmit={handleSubmit}>
                <h2>Přihlašení 👋</h2>
                <input type="text" value={username} placeholder="jméno"
                onChange={e => setUsername(e.target.value)} required />
                <input type="password" value={password} placeholder="heslo"
                onChange={e => setPassword(e.target.value)} required />
                <button className="login-button" type="submit">
                    Přihlásit se
                </button>
                <p>{message}</p>
            </form>
        </div>
        </>
    )
}

export default Login;