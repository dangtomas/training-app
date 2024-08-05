import { UpdateContext } from "@/app/trainings/page";
import { generateDateString } from "@/utils/dateHelper";
import { Dispatch, SetStateAction, useContext } from "react";
import deleteTraining from "@/utils/api/deleteTraining";

export default function DeleteTrainingModal(props: {
    date: Date;
    duration: number;
    trainingId: string;
    setIsDeleteModal: Dispatch<SetStateAction<boolean>>;
}) {
    const updatePage = useContext(UpdateContext);

    async function handleDelete() {
        try {
            await deleteTraining(props.trainingId);
            if (updatePage != null) {
                updatePage((a) => !a);
            }
        } catch (err) {
            alert("Nepovedlo se odstranit trénink 😔");
        } finally {
            props.setIsDeleteModal(false);
        }
    }

    return (
        <div className="no-doc-scroll fixed z-10 flex h-full w-full items-center bg-[rgba(0,0,0,0.5)]">
            <div className="box flex h-[160px] w-[360px] flex-col items-center">
                <h3 className="font-bold">Opravdu chceš smazat trénink?</h3>
                <h3>{generateDateString(props.date, props.duration)}</h3>
                <button
                    type="button"
                    className="my-2 bg-red-500 px-2 text-white"
                    onClick={handleDelete}
                >
                    Ano
                </button>
                <button
                    className="text-sky-500"
                    onClick={() => {
                        props.setIsDeleteModal(false);
                    }}
                >
                    Zrušit
                </button>
            </div>
        </div>
    );
}
