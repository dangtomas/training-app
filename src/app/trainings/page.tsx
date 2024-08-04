"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Training from "@/types/Training";
import Week from "@/types/Week";
import fetchWeeks from "../../utils/api/fetchWeeks";
import fetchTrainings from "@/utils/api/fetchTrainings";
import TrainingCard from "@/components/TrainingCard/TrainingCard";
import Link from "next/link";
import { createContext } from "react";

export const UpdateContext = createContext<Dispatch<
    SetStateAction<boolean>
> | null>(null);

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [currentWeek, setCurrentWeek] = useState<Week>();
    const [update, setUpdate] = useState(false);

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
        if (!currentWeek) {
            return;
        }
        setLoading(true);
        fetchTrainings(
            new Date(currentWeek.from),
            new Date(currentWeek.to),
        ).then((trainings) => {
            setTrainings(trainings);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });
    }, [currentWeek, update]);

    return (
        <UpdateContext.Provider value={setUpdate}>
            {loading ? (
                <div className="box mt-[95px] h-[85vh] py-40 text-2xl">
                    Načítání...
                </div>
            ) : (
                <div className="flex flex-col items-center overscroll-contain pb-3">
                    <div className="mt-[90px] flex w-[95vw] max-w-[600px] items-center">
                        <select
                            value={currentWeek?._id}
                            className="flex-1 rounded-md border border-gray-400 p-2 text-xl"
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
                                        {week.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <Link
                        href="/training-form"
                        className="mt-2 w-[95vw] max-w-[600px] rounded-md border border-gray-400 bg-white py-1 text-center text-lg"
                    >
                        <i className="fa-solid fa-plus"></i> Vytvořit trénink
                    </Link>
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
                </div>
            )}
        </UpdateContext.Provider>
    );
}
