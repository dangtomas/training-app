import { Dispatch, SetStateAction, useContext } from "react";
import UpdateContext from "@/utils/updateContext";
import { generateDateString } from "@/utils/dateHelper";
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
            updatePage();
        } catch (err) {
            alert("Nepovedlo se odstranit trénink 😔");
        } finally {
            props.setIsDeleteModal(false);
        }
    }

    return (
        <div className="no-doc-scroll fixed top-0 flex h-full w-full items-center bg-[rgba(0,0,0,0.5)]">
            <div className="box flex w-[360px] flex-col items-center py-5">
                <h3 className="text-xl font-bold">
                    Opravdu chceš smazat trénink?
                </h3>
                <h3 className="text-xl">
                    {generateDateString(props.date, props.duration)}
                </h3>
                <button
                    type="button"
                    className="my-2 bg-red-500 px-2 text-lg text-white"
                    onClick={handleDelete}
                >
                    Ano
                </button>
                <button
                    className="text-lg text-sky-500"
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
