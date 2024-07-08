import { useNavigate } from "react-router-dom";
import MenuTabProps from "../types/MenuTabProps";

function MenuTab(props: MenuTabProps) {
    const navigate = useNavigate();

    return (
        <button className="menu-tab" onClick={() => {navigate(props.to)}}>
            <div>
                <span className="menu-tab-logo">{props.logo}</span>
                <span className="menu-tab-name">{props.name}</span>
            </div>
            <i className="fa-solid fa-arrow-right"></i>
        </button>
    )
}

export default MenuTab;