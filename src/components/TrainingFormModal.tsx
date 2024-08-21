import { Dispatch, SetStateAction } from "react";
import Training from "@/types/Training";
import modifyTrainings from "@/utils/api/modifyTrainings";
import { getTimezoneOffset } from "@/utils/dateHelper";
import TrainingType from "@/types/Training";

export default function TrainingFormModal(props: {
    training: Training | null;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    setIsTrainingFormModal: Dispatch<SetStateAction<boolean>>;
}) {
    const now = new Date();
    now.setUTCHours(16 - getTimezoneOffset("Europe/Prague") / 60, 30);

    let defaults: TrainingType = {
        _id: props.training?._id || "",
        activity: props.training?.activity || "badminton",
        date: props.training?.date || now,
        duration: props.training?.duration || 90,
        isTrainer: props.training ? props.training.isTrainer : true,
        courts: props.training ? props.training.courts : 2,
        courtPrice: props.training ? props.training.courtPrice : 210,
        attendance: props.training?.attendance || [],
        info: props.training?.info || "",
    };

    return (
        <div className="no-doc-scroll fixed top-0 flex h-full w-full items-center bg-[rgba(0,0,0,0.5)]">
            <form
                className="box mb-6 mt-[84px] items-start px-5 py-3"
                action={async (formData: FormData) => {
                    await modifyTrainings(formData);
                    props.setIsTrainingFormModal(false);
                    props.setUpdate((a) => !a);
                }}
            >
                <h2 className="w-full text-center text-2xl font-bold">
                    {props.training ? "Upravit" : "Vytvořit"} trénink
                </h2>

                <input
                    className="hidden"
                    defaultValue={defaults._id}
                    name="trainingId"
                />

                <label className="py-1 text-lg font-bold">Aktivita</label>
                <input
                    className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="text"
                    name="activity"
                    required
                    defaultValue={defaults.activity}
                />

                <label className="py-1 text-lg font-bold">Trvání</label>
                <input
                    className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="number"
                    name="duration"
                    step={5}
                    required
                    defaultValue={defaults.duration}
                />

                <label className="py-1 text-lg font-bold">Datum a čas</label>
                <input
                    className="mb-1 w-full appearance-none rounded-sm border border-gray-400 bg-white px-2 py-0.5"
                    type="datetime-local"
                    name="date"
                    required
                    defaultValue={new Date(
                        defaults.date.getTime() +
                            getTimezoneOffset("Europe/Prague") * 60 * 1000,
                    )
                        .toISOString()
                        .substring(0, 16)}
                />

                <label className="py-1 text-lg font-bold">Kurty</label>
                <input
                    className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="number"
                    name="courts"
                    required
                    defaultValue={defaults.courts}
                />

                <label className="py-1 text-lg font-bold">
                    Cena za kurt / h
                </label>
                <input
                    className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="number"
                    name="courtPrice"
                    required
                    defaultValue={defaults.courtPrice}
                />

                <label className="py-1 text-lg font-bold">Standa</label>
                <div className="flex items-center">
                    <input
                        className="h-4 w-4"
                        type="radio"
                        name="isTrainer"
                        value="true"
                        defaultChecked={defaults.isTrainer}
                    />
                    <label className="pl-2">Ano</label>
                    <input
                        className="ml-5 h-4 w-4"
                        type="radio"
                        name="isTrainer"
                        value="false"
                        defaultChecked={!defaults.isTrainer}
                    />
                    <label className="pl-2">Ne</label>
                </div>

                <label className="py-1 text-lg font-bold">
                    Doplňující info (volitelné)
                </label>
                <input
                    className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="text"
                    defaultValue={defaults.info}
                    name="info"
                />

                <button
                    className="mb-3 mt-6 w-full rounded-sm bg-black p-2 text-white hover:bg-stone-800"
                    type="submit"
                >
                    {props.training ? "Upravit" : "Vytvořit"}
                </button>
                <button
                    type="button"
                    className="mt-auto w-full text-sky-500"
                    onClick={() => props.setIsTrainingFormModal(false)}
                >
                    Zrušit
                </button>
            </form>
        </div>
    );
}
