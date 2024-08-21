"use client";

import { useEffect, useState } from "react";
import Training from "@/types/Training";
import Week from "@/types/Week";
import TrainingCard from "@/components/TrainingCard/TrainingCard";
import TrainingTable from "@/components/TrainingTable";
import TrainingFormModal from "@/components/TrainingFormModal";
import Loading from "@/components/Loading";
import fetchWeeks from "../../utils/api/fetchWeeks";
import fetchTrainings from "@/utils/api/fetchTrainings";
import { getDateInterval } from "@/utils/dateHelper";
import UpdateContext from "@/utils/updateContext";

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [currentWeek, setCurrentWeek] = useState<Week>();
    const [update, setUpdate] = useState(false);
    const [showTables, setShowTables] = useState<boolean>();
    const [isCreateTrainingForm, setIsCreateTrainingForm] = useState(false);

    useEffect(() => {
        setShowTables(localStorage.getItem("tables") === "true");
        console.log(localStorage.getItem("tables") === "true");
    }, []);

    useEffect(() => {
        fetchWeeks().then((weeks: Week[]) => {
            setCurrentWeek(
                weeks.find((w) => {
                    return w._id === localStorage.getItem("weekId");
                }) || weeks[0],
            );
            setWeeks(weeks);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        if (!currentWeek) {
            return;
        }
        fetchTrainings(
            new Date(currentWeek.from),
            new Date(currentWeek.to),
        ).then((trainings) => {
            setTrainings(trainings);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    }, [currentWeek, update, showTables]);

    function updatePage() {
        setUpdate((a) => !a);
    }

    return (
        <UpdateContext.Provider value={updatePage}>
            {isCreateTrainingForm && (
                <TrainingFormModal
                    training={null}
                    setUpdate={setUpdate}
                    setIsTrainingFormModal={setIsCreateTrainingForm}
                />
            )}
            {loading ? (
                <Loading />
            ) : (
                <div className="mt-[90px] flex flex-col items-center overscroll-contain pb-3">
                    <div className="mb-2 w-[95vw] max-w-[600px] rounded-md border border-gray-400 bg-white">
                        <button
                            className={`w-1/2 p-1 ${showTables ? "bg-black text-white" : ""} underline`}
                            onClick={() => {
                                if (showTables) {
                                    return;
                                }
                                setLoading(true);
                                localStorage.setItem("tables", "true");
                                setShowTables(true);
                            }}
                        >
                            Tabulky
                        </button>
                        <button
                            className={`w-1/2 p-1 ${showTables ? "" : "bg-black text-white"} underline`}
                            onClick={() => {
                                if (!showTables) {
                                    return;
                                }
                                setLoading(true);
                                localStorage.setItem("tables", "false");
                                setShowTables(false);
                            }}
                        >
                            Tréninky
                        </button>
                    </div>
                    <div className="flex w-[95vw] max-w-[600px] items-center">
                        <select
                            value={currentWeek?._id}
                            className="flex-1 rounded-md border border-gray-400 bg-white p-2 text-xl"
                            onChange={(e) => {
                                localStorage.setItem("weekId", e.target.value);
                                setLoading(true);
                                setCurrentWeek(
                                    weeks.find((w) => w._id === e.target.value),
                                );
                            }}
                        >
                            {weeks.map((week) => {
                                return (
                                    <option
                                        className="appearance-none text-lg"
                                        value={week._id}
                                        key={week._id}
                                    >
                                        {week.name
                                            ? `${week.name} (${getDateInterval(new Date(week.from), new Date(week.to))})`
                                            : getDateInterval(
                                                  new Date(week.from),
                                                  new Date(week.to),
                                              )}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    {showTables ? (
                        <TrainingTable trainings={trainings} />
                    ) : (
                        <>
                            <button
                                onClick={() => setIsCreateTrainingForm(true)}
                                className="mt-2 w-[95vw] max-w-[600px] rounded-md border border-gray-400 bg-white py-1 text-center text-lg"
                            >
                                <i className="fa-solid fa-plus"></i> Vytvořit
                                trénink
                            </button>
                            {trainings &&
                                trainings.map((training) => {
                                    return (
                                        <TrainingCard
                                            key={training._id}
                                            _id={training._id}
                                            activity={training.activity}
                                            date={new Date(training.date)}
                                            duration={training.duration}
                                            isTrainer={training.isTrainer}
                                            courts={training.courts}
                                            courtPrice={training.courtPrice}
                                            info={training.info}
                                            attendance={training.attendance}
                                        />
                                    );
                                })}
                        </>
                    )}
                </div>
            )}
        </UpdateContext.Provider>
    );
}
