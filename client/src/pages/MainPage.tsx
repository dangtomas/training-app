import { useNavigate } from "react-router-dom";
import MenuTab from "../components/MenuTab";
import Header from "../components/Header";
import PlayerCardBig from "../components/PlayerCardBig";
import useFetchUser from "../utils/useFetchUser";

function MainPage() {
    const navigate = useNavigate();
    const {user} = useFetchUser(localStorage.getItem("id")!);
    
    const menuItems = [
        {
            logo: "🏋️‍♂️",
            name: "TRÉNINKY",
            to: "/trainings"
        },
        {
            logo: "👨‍👩‍👧‍👦",
            name: "ČLENOVÉ",
            to: "/members"
        },
        {
            logo: "💵",
            name: "CENY",
            to: "/prices"
        },
        {
            logo: "✏️",
            name: "UPRAVIT",
            to: "/profile"
        }
    ]

    return (
        <>
            <Header/>
            <div id="menu-tab-wrapper">
                <PlayerCardBig 
                    name={user.name} 
                    profilePicSrc={user.profilePicSrc}
                    host={{isHost: false, removeHost: () => {}}}
                />
                {menuItems.map(menuItem => {
                    return <MenuTab
                                name={menuItem.name}
                                logo={menuItem.logo}
                                to={menuItem.to}
                                key={menuItem.name} 
                            />;
                    })}
            </div>
            <button onClick={() => navigate("/login")} id="logout">Odhlásit se</button>
        </>
  )
}

export default MainPage;
