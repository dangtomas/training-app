"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import Training from "@/types/Training";
import User from "@/types/User";
import PlayerCardSmall from "../PlayerCards/PlayerCardSmall";
import HostCard from "../PlayerCards/HostCard";
import DeleteTrainingModal from "./DeleteTrainingModal";
import AddHostModal from "./AddHostModal";
import { generateDateString } from "@/utils/dateHelper";
import calculatePrice from "@/utils/calculatePrice";
import fetchAttendance from "@/utils/api/fetchAttendance";
import updateAttendance from "@/utils/api/updateAttendance";
import fetchUser from "@/utils/api/fetchUser";

export default function TrainingCard(training: Training) {
    const [attendanceList, setAttendanceList] = useState<User[]>([]);
    const [showAttendance, setShowAttendance] = useState(false);
    const [isAttended, setIsAttended] = useState(
        training.attendance.includes(getCookie("id")!),
    );
    const [update, setUpdate] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isAddHostModal, setIsAddHostModal] = useState(false);

    useEffect(() => {
        fetchAttendance(training._id).then(async (result) => {
            setIsAttended(result.includes(getCookie("id")!));
            const userAtendancePromises = result.map((id: string) =>
                fetchUser(id),
            );
            const userAttendance = await Promise.all(userAtendancePromises);
            setAttendanceList(userAttendance);
        });
    }, [update]);

    async function handleYes() {
        if (isAttended) {
            return;
        }
        const userId = getCookie("id")!;
        await updateAttendance(userId, training._id, true);
        setUpdate((a) => !a);
    }

    async function handleNo() {
        if (!isAttended) {
            return;
        }
        const userId = getCookie("id")!;
        await updateAttendance(userId, training._id, false);
        setUpdate((a) => !a);
    }

    return (
        <>
            {isDeleteModal && (
                <DeleteTrainingModal
                    date={training.date}
                    duration={training.duration}
                    trainingId={training._id}
                    setIsDeleteModal={setIsDeleteModal}
                />
            )}

            {isAddHostModal && (
                <AddHostModal
                    trainingId={training._id}
                    setIsAddHostModal={setIsAddHostModal}
                    setUpdate={setUpdate}
                />
            )}

            <div className="box mt-3 items-start pb-2 pt-5">
                <div className="flex w-full justify-between pb-1 pl-5 pr-4">
                    <h1 className="text-2xl font-bold">{training.activity}</h1>
                    <div className="relative bottom-1 flex flex-col items-start sm:flex-row">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModal(true)}
                            className="px-1 text-red-500"
                        >
                            smazat
                        </button>
                        <Link
                            href={`/trainings/form?trainingId=${training._id}`}
                            className="px-1 text-sky-500"
                        >
                            upravit
                        </Link>
                    </div>
                </div>
                <h2 className="pb-1 pl-5 text-xl font-bold">
                    {generateDateString(training.date, training.duration)}
                </h2>
                <h3 className="pl-5 text-lg">
                    Kurty: {training.courts} | Standa:{" "}
                    {training.isTrainer ? "✅" : "❌"}
                </h3>
                <h3 className="pl-5 text-lg">
                    Účast: {attendanceList.length} | Na hráče:{" "}
                    {attendanceList.length === 0
                        ? 0
                        : calculatePrice(training) / attendanceList.length}
                    ,-
                </h3>
                <p className="px-5 py-2">
                    {training.info ? training.info : "‎"}
                </p>
                <div className="flex w-full items-center justify-between pl-5 pr-4">
                    <button
                        className="text-xl"
                        onClick={() => setShowAttendance((a) => !a)}
                    >
                        {showAttendance ? (
                            <i className="fa-solid fa-circle-chevron-up"></i>
                        ) : (
                            <i className="fa-solid fa-circle-chevron-down"></i>
                        )}
                        <span className="pl-1 underline">účast</span>
                    </button>
                    <div>
                        <button
                            onClick={handleYes}
                            className={`w-16 rounded-sm border-2 border-green-500 ${isAttended ? "bg-green-500 text-white" : "text-green-500"}`}
                        >
                            Ano
                        </button>
                        <button
                            onClick={handleNo}
                            className={`ml-2 w-16 rounded-sm border-2 border-red-500 ${isAttended ? "text-red-500" : "bg-red-500 text-white"}`}
                        >
                            Ne
                        </button>
                    </div>
                </div>
                {showAttendance && (
                    <div className="flex w-full flex-col px-5 pt-4 sm:flex-row sm:flex-wrap">
                        {attendanceList.length === 0 ? (
                            <h3 className="w-full py-2 text-center">
                                Zatím nikdo 😞
                            </h3>
                        ) : (
                            attendanceList.map((user) => {
                                return (
                                    <div
                                        className="basis-1/2 pb-3"
                                        key={user._id}
                                    >
                                        {user._id.startsWith("HOST") ? (
                                            <HostCard
                                                name={user.name}
                                                hostId={user._id}
                                                trainingId={training._id}
                                                setUpdate={setUpdate}
                                            />
                                        ) : (
                                            <PlayerCardSmall
                                                name={user.name}
                                                profilePicSrc={
                                                    user.profilePicSrc
                                                }
                                            />
                                        )}
                                    </div>
                                );
                            })
                        )}
                        <button
                            className="basis-full text-sm text-sky-400"
                            onClick={() => setIsAddHostModal(true)}
                        >
                            Přidat hosta
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
