import Week from "@/models/Week";
import CancelFormLink from "@/components/cancelFormLink";
import modifyWeeks from "@/utils/api/modifyWeeks";
import WeekType from "@/types/Week";

export default async function WeekForm({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const weekId = searchParams?.weekId;
    const week = await Week.findById(weekId);

    console.log();

    let defaults: WeekType = {
        name: week?.name || "",
        from: week?.from,
        to: week?.to,
        _id: week?._id || "",
    };

    return (
        <form
            className="box mb-6 mt-[160px] items-start px-5 py-3"
            action={modifyWeeks}
        >
            <h2 className="w-full text-center text-2xl font-bold">
                {week ? "Upravit" : "Vytvořit"} týden
            </h2>

            <input
                className="hidden"
                defaultValue={defaults._id.toString()}
                name="weekId"
            />

            <label className="py-1 text-lg font-bold">Jméno (volitelné)</label>
            <input
                className="mb-1 w-full rounded-sm border border-gray-400 px-2 py-0.5"
                type="text"
                name="name"
                defaultValue={defaults.name}
            />

            <label className="py-1 text-lg font-bold">Od:</label>
            <input
                className="mb-1 min-h-8 w-full appearance-none rounded-sm border border-gray-400 bg-white px-2 py-0.5"
                type="date"
                name="from"
                required
                defaultValue={defaults.from?.toISOString().substring(0, 10)}
            />

            <label className="py-1 text-lg font-bold">Do:</label>
            <input
                className="mb-1 min-h-8 w-full appearance-none rounded-sm border border-gray-400 bg-white px-2 py-0.5"
                type="date"
                name="to"
                required
                defaultValue={defaults.to?.toISOString().substring(0, 10)}
            />
            <button
                className="mb-3 mt-6 w-full rounded-sm bg-black p-2 text-white hover:bg-stone-800"
                type="submit"
            >
                {week ? "Upravit" : "Vytvořit"}
            </button>
            <CancelFormLink href="/weeks" />
        </form>
    );
}
