import { useEffect, useRef, useState } from "react";
import { generateDateString } from "../utils/dateHelper"
import PlayerCardSmall from "./PlayerCardSmall";
import TrainingCardProps from "../types/TrainingCardProps";
import { Link } from "react-router-dom";
import calculatePrice from "../utils/calculatePrice";
import UserProps from "../types/UserProps";
import { useNavigate } from "react-router-dom";

interface UserPropsWithHost extends UserProps {
    host: boolean
}

function TrainingCard(props: TrainingCardProps) {
    const [showAttendance, setShowAttendance] = useState(false);
    const [attended, setAttended] = useState(
        props.attendance.includes(localStorage.getItem("id")!)
    );
    const [update, setUpdate] = useState(false);
    const [attendanceList, setAttendanceList] = useState<UserPropsWithHost[]>([]);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isAddHostModal, setIsAddHostModal] = useState(false);
    const addHostRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser(id: string) {
            
            if (id.startsWith("HOST-")) {
                return {
                    name: id.split("-", 2)[1],
                    username: id.split("-", 2)[1].replace(" ", "").toLowerCase(),
                    profilePicSrc: "https://res.cloudinary.com/dynjmtw8a/image/upload/v1720293279/ybsesmgjvxmvt4wmglvy.jpg",
                    host: true,
                    _id: "host"
                }
            }

            const response = await fetch(
                `https://training-app-0ni3.onrender.com/api/users/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status != 200) {
                throw new Error();
            }

            const data: UserProps = (await response.json()).user;
            return {...data, host: false};
        }

        async function fetchUserAttendance() {
            try {
                const attendance: string[] = await fetchAttendance();
                setAttended(attendance.includes(localStorage.getItem("id")!))
                const attendancePromises = attendance.map(id => fetchUser(id));
                const data = await Promise.all(attendancePromises);
                setAttendanceList(data);
            } catch (err) {
                navigate("/error");
            }
            
        }
        fetchUserAttendance();
    }, [attended, update])

    async function fetchAttendance() {
        try {
            const response = await fetch(
                `https://training-app-0ni3.onrender.com/api/trainings/${props._id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status !== 200) {
                throw new Error();
            }

            const data = await response.json();
            return data.training.attendance;
        } catch {
            navigate("/login");
        }
    }

    async function updateTraining(attendance: string[]) {
        try {
            const response = await fetch(`https://training-app-0ni3.onrender.com/api/trainings/${props._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({attendance})
                }
            )
            if (response.status != 200) {
                throw new Error();
            }

            setUpdate(a => !a);
            
        } catch(err) {
           navigate("/login");
        }
    }

    async function handleYes() {
        let attendance = await fetchAttendance();
        if (attended || localStorage.getItem("id") === "host" ||
            attendance.includes(localStorage.getItem("id")!)) {
            return;
        }
        attendance.push(localStorage.getItem("id")!)
        updateTraining(attendance);

        setTimeout(async () => {
            attendance = await fetchAttendance();
            if (!attendance.includes(localStorage.getItem("id"))) {
                alert("Zkus to znova, někde došlo k chybě")
            }
        }, 500)
    }

    async function handleNo() {
        let attendance = await fetchAttendance();
        if (!attended) {
            return;
        }
        const index = attendance.indexOf(localStorage.getItem("id")!);
        attendance.splice(index, 1);
        updateTraining(attendance);

        setTimeout(async () => {
            attendance = await fetchAttendance();
            if (attendance.includes(localStorage.getItem("id"))) {
                alert("Zkus to znova, někde došlo k chybě")
            }
        }, 500)
    }

    async function handleDelete() {
        try {
            const response = await fetch(`https://training-app-0ni3.onrender.com/api/trainings/${props._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )
            if (response.status != 200) {
                throw new Error();
            }
        } catch(err) {
            alert("Nemůžeš odstranit trénink 😔");
        } finally {
            setIsDeleteModal(false);
            props.updatePage();
        }
    }

    async function handleAddHost() {
        let attendance = await fetchAttendance();
        const hostId = `HOST-${addHostRef.current!.value}`
        if (localStorage.getItem("id") !== "host") {
            attendance.push(hostId);
            updateTraining(attendance);
        }
        setIsAddHostModal(false);

        setTimeout(async () => {
            attendance = await fetchAttendance();
            if (!attendance.includes(hostId)) {
                alert("Zkus to znova, někde došlo k chybě.")
            }
        }, 500)
    }

    async function removeHost(name: string) {
        let attendance = await fetchAttendance();
        const index = attendance.indexOf(`HOST-${name}`);
        attendance.splice(index, 1);
        updateTraining(attendance);

        setTimeout(async () => {
            attendance = await fetchAttendance();
            if (attendance.includes(`HOST-${name}`)) {
                alert("Zkus to znova, někde došlo k chybě.")
            }
        }, 500)
    }

    return (<>

    <div className={`modal-wrap ${isDeleteModal ? "" : "hidden"}`} >
        <div className="delete-modal-content">
            <h3>Opravdu chceš smazat trénink?</h3>
            <h3>{generateDateString(props.date, props.duration)}</h3>
            <button type="button" className="confirm-delete" onClick={handleDelete}>
                Ano
            </button>
            <button type="button" className="cancel-delete" onClick={() => setIsDeleteModal(false)}>
                Zrušit
            </button>
        </div>
    </div>

    <div className={`modal-wrap ${isAddHostModal ? "" : "hidden"}`}>
        <div className="add-host-modal-content">
            <h3>Přidat hosta</h3>
            <input type="text" className="add-host-input" ref={addHostRef} required/>
            <button type="button" className="confirm-add-host-btn"
                    onClick={handleAddHost}>
                    Přidat
            </button>
            <button type="button" className="cancel-add-host-btn"
                    onClick={() => setIsAddHostModal(false) }>
                Zrušit
                </button>
        </div>
    </div>


    <div className="training-card">
        <div className="training-card-info">
            <h2 className="training-card-overview">
                <span className="training-card-activity">{props.activity.toLowerCase()}</span>
                <span className="training-card-buttons">
                    <button type="button" 
                            className="training-card-delete" onClick={() => setIsDeleteModal(true)}>
                        smazat
                    </button>
                    <Link to="/training-form" 
                          className="training-card-edit" 
                          state={JSON.parse(JSON.stringify({...props, isNew: false}))}>
                        upravit
                    </Link>
                </span>
            </h2>
            <h3>{generateDateString(props.date, props.duration)}</h3>
            <h4>
                Kurty: {props.courts} | 
                Standa: {props.isTrainer ? "✅" : "❌"} 
            </h4>
            <h4>
                Účast: {attendanceList.length} | 
                Na hráče: {calculatePrice(props.duration, props.courts, 
                props.courtPrice, props.isTrainer, attendanceList.length)},-
            </h4> 
            
            <p className={props.info ? "" : "hidden"}>{props.info}</p>
        </div>
        <div className={`training-card-button-wrap ${props.info ? "" : "padding-top"}`}>
            <div className="show-more-button-wrap">
                <button className="show-more-button" onClick={() => setShowAttendance(a => !a)}>
                    <i className="fa-solid fa-circle-chevron-down"></i>
                    <span>účast</span>
                </button>
            </div>
            <div className="attendance-button-wrap">
                <button type="button" onClick={handleYes}
                className={`attendance-button accept ${attended ? "active" : ""}`}>
                    Ano
                </button>
                <button type="button" onClick={handleNo}
                className={`attendance-button reject ${attended ? "" : "active"}`}>
                    Ne
                </button>
            </div>
        </div>
        {showAttendance &&
        <div className="attendance-cards-wrap">
        {   
            attendanceList.length === 0 ? <h3 className="empty">Zatím nikdo 😞</h3> :
            attendanceList.map(user => {
                return <PlayerCardSmall key={user.username} 
                    name={user.name} 
                    profilePicSrc={user.profilePicSrc}
                    host={{isHost: user.host, removeHost}}
                    />;    
            })
        }
            <button className="add-host-btn" type="button" onClick={() => setIsAddHostModal(true)}>
                Přidat hosta
            </button>
        </div>
        }
    </div>
    </>)
}

export default TrainingCard;