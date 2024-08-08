"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WeekTab from "@/components/WeekTab/WeekTab";
import Loading from "@/components/Loading";
import fetchWeeks from "@/utils/api/fetchWeeks";
import Week from "@/types/Week";
import UpdateContext from "@/utils/updateContext";

export default function Weeks() {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchWeeks().then((result) => {
            setWeeks(result);
        });
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, [update]);

    function updatePage() {
        setUpdate((a) => !a);
    }

    return (
        <UpdateContext.Provider value={updatePage}>
            {loading ? (
                <Loading />
            ) : (
                <div className="mt-[85px] flex flex-col items-center">
                    <Link
                        href="/weeks/form"
                        className="mb-2 w-[95vw] max-w-[600px] rounded-md border border-gray-400 bg-white py-1 text-center text-lg"
                    >
                        <i className="fa-solid fa-plus"></i> Přidat týden
                    </Link>
                    <div className="box">
                        {weeks.map((w) => {
                            return (
                                <WeekTab
                                    key={w._id}
                                    _id={w._id}
                                    name={w.name}
                                    from={new Date(w.from)}
                                    to={new Date(w.to)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </UpdateContext.Provider>
    );
}
