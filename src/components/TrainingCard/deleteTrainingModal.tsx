import { generateDateString } from "@/utils/dateHelper";
import { getCookie } from "cookies-next";
import { Dispatch, SetStateAction } from "react";

export default function DeleteTrainingModal(props: {
    date: Date;
    duration: number;
    trainingId: string;
    setIsDeleteModal: Dispatch<SetStateAction<boolean>>;
}) {
    async function handleDelete() {
        try {
            const response = await fetch(`/api/trainings/${props.trainingId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            });
            if (response.status != 200) {
                throw new Error();
            }
            alert("Úspéšně smazán trénink ✅");
        } catch (err) {
            alert("Nepovedlo se odstranit trénink 😔");
        } finally {
            props.setIsDeleteModal(false);
        }
    }

    return (
        <div className="">
            <h3>Opravdu chceš smazat trénink?</h3>
            <h3>{generateDateString(props.date, props.duration)}</h3>
            <button type="button" className="" onClick={handleDelete}>
                Ano
            </button>
            <button className="" onClick={() => props.setIsDeleteModal(false)}>
                Zrušit
            </button>
        </div>
    );
}
