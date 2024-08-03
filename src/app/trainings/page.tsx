"use client";

import { useEffect, useState } from "react";
import Training from "@/types/Training";
import Week from "@/types/Week";
import { useRouter } from "next/navigation";
import fetchWeeks from "./fetchWeeks";
import fetchTrainings from "./fetchTrainings";
import TrainingCard from "@/components/TrainingCard/TrainingCard";

export default function Trainings() {
    const router = useRouter();
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [currentWeek, setCurrentWeek] = useState<Week>();

    useEffect(() => {
        try {
            fetchWeeks().then((weeks) => {
                setCurrentWeek(weeks[0]);
                setWeeks(weeks);
            });
        } catch {
            router.push("/login");
            alert("Někde došlo k chybě ❌🙁");
        }
    }, []);

    useEffect(() => {
        try {
            fetchTrainings(currentWeek).then((trainings) => {
                setTrainings(trainings);
                setLoading(false);
            });
        } catch {
            router.push("/login");
            alert("Někde došlo k chybě ❌🙁");
        }
    }, [currentWeek]);

    return loading ? (
        <div className="box mt-[90px] h-[85vh] py-40 text-2xl">Načítání...</div>
    ) : (
        <div className="flex flex-col items-center">
            <select
                value={currentWeek?._id}
                className="mt-[90px] w-[95vw] max-w-[600px] rounded-md border border-gray-400 p-2"
                onChange={(e) => {
                    setLoading(true);
                    setCurrentWeek(weeks.find((w) => w._id === e.target.value));
                }}
            >
                {weeks.map((week) => {
                    return (
                        <option value={week._id} key={week._id}>
                            {week.name}
                        </option>
                    );
                })}
            </select>
            {trainings.map((training) => {
                return (
                    <TrainingCard
                        _id={training._id}
                        activity={training.activity}
                        date={training.date}
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
    );
}
