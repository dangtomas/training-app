import TrainingType from "@/types/Training";
import Training from "@/models/Training";
import modifyTrainings from "@/utils/api/modifyTrainings";
import CancelFormLink from "@/components/cancelFormLink";

export default async function TrainingForm({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const now = new Date();
    now.setHours(16, 30);
    const trainingId = searchParams?.trainingId;
    const training = await Training.findById(trainingId);
    let defaults: TrainingType = {
        _id: training?.id || "",
        activity: training?.activity || "badminton",
        date: new Date(
            (training?.date || now).getTime() -
                new Date().getTimezoneOffset() * 60000,
        ),
        duration: training?.duration || 90,
        isTrainer: training ? training.isTrainer : true,
        courts: training ? training.courts : 2,
        courtPrice: training ? training.courtPrice : 210,
        attendance: training?.attendance || [],
        info: training?.info || "",
    };

    return (
        <form
            className="box mb-6 mt-[84px] items-start px-5 py-3"
            action={modifyTrainings}
        >
            <h2 className="w-full text-center text-2xl font-bold">
                {training ? "Upravit" : "Vytvořit"} trénink
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
                className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                type="datetime-local"
                name="date"
                required
                defaultValue={defaults.date.toISOString().substring(0, 16)}
            />

            <label className="py-1 text-lg font-bold">Kurty</label>
            <input
                className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                type="number"
                name="courts"
                required
                defaultValue={defaults.courts}
            />

            <label className="py-1 text-lg font-bold">Cena za kurt / h</label>
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
                {training ? "Upravit" : "Vytvořit"}
            </button>
            <CancelFormLink />
        </form>
    );
}
