import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrainingCard from "../components/TrainingCard";
import TrainingCardProps from "../types/TrainingCardProps";
import Header from "../components/Header";
import calculatePrice from "../utils/calculatePrice";

function TrainingsPage() {
    const [trainings, setTrainings] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);
    const mineOnlyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function fetchTrainings() {
            try {
                const queryString = `?from=${fromRef.current!.value}&to=${toRef.current!.value}`;
                const response = await fetch(
                    `https://training-app-0ni3.onrender.com/api/trainings${queryString}`, 
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );
                if (response.status !== 200) {
                    throw new Error();
                }
                let data = await response.json();
                if (mineOnlyRef.current!.checked) {
                    data = data.filter((training: TrainingCardProps) => 
                        training.attendance.includes(localStorage.getItem("id")!)
                    )
                }
                setTrainings(data);
                setTotalPrice(data.reduce((curr: number, training: TrainingCardProps) => {
                    return curr + calculatePrice(training.duration, training.courts,
                                                 training.courtPrice, training.isTrainer,
                                                 training.attendance.length)
                }, 0))
            } catch(err) {
                navigate("/login");
            }
        }
        fetchTrainings();
    }, [update])

    function updatePage() {
        setUpdate(a => !a);
    }

    function handleFilterSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        updatePage();   
    }
    
    return (<>
            <Header/>  
            <div id="trainings-options">
                <div id="training-options-buttons">
                    <Link to="/training-form" 
                        state={JSON.parse(JSON.stringify({
                            activity: "Badminton",
                            duration: 90,
                            date: new Date().setHours(0, 0, 0, 0),
                            courts: 2,
                            courtPrice: 210,
                            isTrainer: true,
                            info: "",
                            updatePage,
                            isNew: true
                        }))}>
                        <span className={`create-new-training ${showFilter ? "hidden": ""}`}>
                            <i className="fa-solid fa-plus"></i>
                                Vytvořit trénink
                        </span>
                    </Link>
                    <button className="filter-trainings-button" onClick={() => setShowFilter(p => !p)}>
                            Filtrovat
                            <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <form id="filter-form" className={showFilter ? "" : "hidden"} onSubmit={handleFilterSubmit}>
                    <label>Od:</label>
                    <input type="date" ref={fromRef}
                               defaultValue={new Date().toISOString().substring(0,10)}/>
                    <label>Do:</label>
                    <input type="date" ref={toRef} />
                    <div id="mine-only-checkbox">
                        <label>Jenom s mojí účastí</label>
                        <input type="checkbox" ref={mineOnlyRef}/>
                    </div>
                    <button className="login-button" type="submit">
                        Filtrovat
                    </button>
                    <label className="training-stat">
                        Celkem tréninků: <b>{trainings.length}</b> 
                    </label>
                    <label className="training-stat">
                        Celková cena: 
                        <b> {totalPrice},-</b>
                    </label>
                </form>
            </div>
            {trainings.map((training: TrainingCardProps) => {
            return <TrainingCard 
                    _id={training._id}
                    isTrainer={training.isTrainer}
                    courts={training.courts}
                    courtPrice={training.courtPrice}
                    duration={training.duration}
                    info={training.info}
                    attendance={training.attendance}
                    date={new Date(training.date)}
                    activity={training.activity}
                    key={training._id}
                    updatePage={updatePage}
                />})}
        </>
)}

export default TrainingsPage;