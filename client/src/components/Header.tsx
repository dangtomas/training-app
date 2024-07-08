import { useNavigate } from "react-router-dom";
import logo from "../assets/header-logo.png";

function Header() {
    const navigate = useNavigate();

    return (
    <div id="header">
        <img src={logo}/>
        <button type="button" onClick={() => {navigate("/")}}>
            <i className="fa-solid fa-house"></i>
        </button>
    </div>
    )
}

export default Header;