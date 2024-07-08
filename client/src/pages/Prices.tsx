import { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Prices() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, [])
    
    return (
            <>
                <Header/>
                <div id="prices">
                    <h2>Standa</h2>
                    <span>500,-</span>
                    <h2>Cena kurtu do 15h</h2>
                    <span>210,-</span>
                    <h2>Cena kurtu od 15h</h2>
                    <span>310,-</span>
                    <h2>Cena kurtu o prázdninách</h2>
                    <span>140,-</span>
                </div>
            </>
        )
}

export default Prices;