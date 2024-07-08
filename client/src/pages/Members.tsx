import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import UserProps from "../types/UserProps";
import PlayerCardSmall from "../components/PlayerCardSmall";

function Members() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch("http://localhost:3000/api/users", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status !== 200) {
                    throw new Error();
                }

                let data = await response.json();
                setMembers(data);
            } catch(err) {
                navigate("/login");
            }
        }
        fetchMembers();
    }, [])

    return (
        <>
        <Header />
        <div id="members-wrapper">
            {members.map((member: UserProps) => {
                return <PlayerCardSmall 
                            name={member.name}
                            profilePicSrc={member.profilePicSrc}
                            host={{isHost: false, removeHost: () => {}}}
                            key={member.username} 
                        />
            })}
        </div>
        </>
    )
}

export default Members;