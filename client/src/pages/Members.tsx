import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import UserProps from "../types/UserProps";
import PlayerCardSmall from "../components/PlayerCardSmall";
import PlayerCardBig from "../components/PlayerCardBig";

function Members() {
    const [members, setMembers] = useState<UserProps[]>([]);
    const [coach, setCoach] = useState<UserProps>();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch("https://training-app-0ni3.onrender.com/api/users", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status !== 200) {
                    throw new Error();
                }

                let data: UserProps[] = await response.json();
                setMembers(data);
            } catch(err) {
                navigate("/login");
            }
        }
        fetchMembers();
    },[])

    useEffect(() => {
        setCoach(members.find(member => member._id === "668d082fbb6894b643abeb6b")!)   
    }, [members])

    return (
        <>
        <Header />
        <div id="coach-wrap">
            <PlayerCardBig
                name={coach?.name || "načítání"}
                profilePicSrc={coach?.profilePicSrc || ""}
                host={{isHost: false, removeHost: () => {}}} 
            />
        </div>
        <div id="members-wrapper">
            {members.map((member) => {
                if (member._id !== "668d082fbb6894b643abeb6b") {
                    return <PlayerCardSmall 
                            name={member.name}
                            profilePicSrc={member.profilePicSrc}
                            host={{isHost: false, removeHost: () => {}}}
                            key={member.username} 
                    />
                }
            })}
        </div>
        </>
    )
}

export default Members;