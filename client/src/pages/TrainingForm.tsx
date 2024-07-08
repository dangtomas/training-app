import { FormEvent, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addDurationToDate } from "../utils/dateHelper";
import Header from "../components/Header";

function TrainingForm() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const activityRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const courtsRef = useRef<HTMLInputElement>(null);
    const courtPriceRef = useRef<HTMLInputElement>(null);
    const yesTrainerRef = useRef<HTMLInputElement>(null);
    const noTrainerRef = useRef<HTMLInputElement>(null);
    const infoRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const body = JSON.stringify({
            activity: activityRef.current!.value,
            duration: durationRef.current!.value,
            date: dateRef.current!.value,
            courts: courtsRef.current!.value,
            courtPrice: courtPriceRef.current!.value,
            isTrainer: yesTrainerRef.current!.checked,
            attendance: state.attendance,
            info: infoRef.current!.value
        })
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
        try {
            if (state.isNew) {
                await fetch("http://localhost:3000/api/trainings", {
                    method: "POST",
                    headers,
                    body
                })
            } else {
                await fetch(`http://localhost:3000/api/trainings/${state._id}`, {
                    method: "PATCH",
                    headers,
                    body
                })
            }
            navigate("/trainings")     
        } catch(error) {
            navigate("/login");
        }
    }

    return (
    <>
        <Header/>
        <form id="update-training-form" onSubmit={handleSubmit}>
            <h2>{state.isNew ? "Vytvořit" : "Upravit"} trénink</h2>

            <label>Aktivita</label>
            <input type="text" ref={activityRef} required
            defaultValue={state.activity}/>

            <label>Trvání</label>
            <input type="number" ref={durationRef} step={5} required
            defaultValue={state.duration}/>

            <label>Datum a čas</label>
            <input type="datetime-local" ref={dateRef} required
            defaultValue={
                addDurationToDate(new Date(state.date), 120)
                    .toISOString().substring(0,16)
            }/>

            <label>Kurty</label>
            <input type="number" ref={courtsRef} 
            defaultValue={state.courts}/>

            <label>Cena za kurt / h</label>
            <input type="number" ref={courtPriceRef} step={10} required
            defaultValue={state.courtPrice}/>

            <label>Standa</label>
            <div className="radio-options">
                <input type="radio" value="yes" name="option" ref={yesTrainerRef} 
                defaultChecked/> 
                <label className="radio-label">Ano</label>
                <input type="radio" value="no" name="option" ref={noTrainerRef}/>
                <label className="radio-label">Ne</label>  
            </div>

            <label>Doplňující info (volitelné)</label>
            <input type="text" ref={infoRef} defaultValue={state.info}
                    placeholder="Ranní technika na Sprintu." />
            <button className="login-button" type="submit">
                {state.isNew ? "Vytvořit" : "Upravit"}
            </button>
            <Link id="cancel-update-training" to="/trainings">Zrušit</Link>
        </form>
    </>
    )
}

export default TrainingForm;