import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Week from "@/types/Week";
import { getDateInterval } from "@/utils/dateHelper";
import DeleteWeekModal from "./deleteWeekModal";

export default function WeekTab(week: Week) {
    const router = useRouter();
    const [showMore, setShowMore] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const dateString = getDateInterval(week.from, week.to);

    return (
        <>
            {isDeleteModal && (
                <DeleteWeekModal
                    name={week.name}
                    weekId={week._id}
                    from={week.from}
                    to={week.to}
                    setIsDeleteModal={setIsDeleteModal}
                />
            )}
            <div className="w-full border-b border-gray-400 p-4">
                <div className="flex w-full items-center justify-between text-xl">
                    <h2 className="font-bold">
                        {week.name
                            ? `${week.name} (${dateString})`
                            : dateString}
                    </h2>
                    <button onClick={() => setShowMore((a) => !a)}>
                        {showMore ? (
                            <i className="fa-solid fa-circle-chevron-up"></i>
                        ) : (
                            <i className="fa-solid fa-circle-chevron-down"></i>
                        )}
                    </button>
                </div>
                {showMore && (
                    <div className="flex items-center justify-between pt-2 text-lg text-gray-600">
                        <div>
                            <button
                                onClick={() => {
                                    localStorage.setItem("weekId", week._id);
                                    localStorage.setItem("tables", "true");
                                    router.push("/trainings");
                                }}
                                className="underline"
                            >
                                Tabulka
                            </button>
                            <button
                                className="ml-2 underline"
                                onClick={() => {
                                    localStorage.setItem("weekId", week._id);
                                    localStorage.setItem("tables", "false");
                                    router.push("/trainings");
                                }}
                            >
                                Tréninky
                            </button>
                        </div>
                        <div>
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    setIsDeleteModal(true);
                                }}
                            >
                                Smazat
                            </button>
                            <Link
                                className="pl-2 text-sky-500"
                                href={`/weeks/form?weekId=${week._id}`}
                            >
                                Upravit
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
