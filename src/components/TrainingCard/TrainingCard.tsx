"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Training from "@/types/Training";
import User from "@/types/User";
import PlayerCardSmall from "../PlayerCards/PlayerCardSmall";
import HostCard from "../PlayerCards/HostCard";
import DeleteTrainingModal from "./DeleteTrainingModal";
import AddHostModal from "./AddHostModal";
import { generateDateString } from "@/utils/dateHelper";
import calculatePrice from "@/utils/calculatePrice";
import fetchTraining from "@/utils/api/fetchTraining";
import updateAttendance from "@/utils/api/updateAttendance";
import fetchUser from "@/utils/api/fetchUser";
import EditAttendanceModal from "./EditAttendanceModal";
import TrainingFormModal from "../TrainingFormModal";

export default function TrainingCard(
    trainingProp: Training & { currentDate: Date },
) {
    const [training, setTraining] = useState<Training>({
        ...trainingProp,
    });
    const [attendanceList, setAttendanceList] = useState<User[]>([]);
    const [showAttendance, setShowAttendance] = useState(false);
    const [isAttended, setIsAttended] = useState(
        trainingProp.attendance.includes(getCookie("id")!),
    );
    const [update, setUpdate] = useState(false);
    const [isEditTrainingForm, setIsEditTrainingForm] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isAddHostModal, setIsAddHostModal] = useState(false);
    const [isEditAttendanceModal, setIsEditAttendanceModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [changing, setChanging] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTraining(trainingProp._id).then(async (result: Training) => {
            setIsAttended(result.attendance.includes(getCookie("id")!));
            const userAtendancePromises = result.attendance.map((id: string) =>
                fetchUser(id),
            );
            const userAttendance = await Promise.all(userAtendancePromises);
            setAttendanceList(userAttendance);
            setTraining({ ...result, date: new Date(result.date) });
            setLoading(false);
        });
    }, [update]);

    async function handleChange(clickedYes: boolean) {
        if ((clickedYes && isAttended) || (!clickedYes && !isAttended)) {
            return;
        }
        const userId = getCookie("id")!;
        const resultString = await updateAttendance(
            userId,
            training._id,
            clickedYes,
        );
        if (resultString) {
            alert(resultString);
        }
        setChanging(true);
        setLoading(true);
        setUpdate((a) => !a);
        setChanging(false);
    }

    return loading || changing ? (
        <div className="box mt-3 py-[92px] text-2xl">Načítání...</div>
    ) : (
        <>
            {isEditTrainingForm && (
                <TrainingFormModal
                    training={training}
                    setUpdate={setUpdate}
                    setIsTrainingFormModal={setIsEditTrainingForm}
                />
            )}
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

            {isEditAttendanceModal && (
                <EditAttendanceModal
                    trainingId={training._id}
                    setIsEditAttendanceModal={setIsEditAttendanceModal}
                    setUpdate={setUpdate}
                />
            )}

            <div className="box mt-3 items-start pb-2 pt-1">
                <div className="flex w-full items-center justify-between pb-1.5 pl-5 pr-4">
                    <h1 className="pt-3 text-2xl font-bold">
                        {training.activity}
                    </h1>
                    <div className="flex flex-col items-start justify-start pb-1 pt-3 sm:flex-row sm:pt-2">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModal(true)}
                            className="px-1 text-red-500"
                        >
                            smazat
                        </button>
                        <button
                            onClick={() => setIsEditTrainingForm(true)}
                            className="px-1 text-sky-500"
                        >
                            upravit
                        </button>
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
                        : Math.round(
                              calculatePrice(training) / attendanceList.length,
                          )}
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
                    {trainingProp.date.getTime() -
                        trainingProp.currentDate.getTime() >
                    36 * 60 * 60 * 1000 ? (
                        <div>
                            <button
                                onClick={() => {
                                    handleChange(true);
                                }}
                                className={`w-16 rounded-sm border-2 border-green-500 ${isAttended ? "bg-green-500 text-white" : "text-green-500"}`}
                            >
                                Ano
                            </button>
                            <button
                                onClick={() => {
                                    handleChange(false);
                                }}
                                className={`ml-2 w-16 rounded-sm border-2 border-red-500 ${isAttended ? "text-red-500" : "bg-red-500 text-white"}`}
                            >
                                Ne
                            </button>
                        </div>
                    ) : (
                        <div>Přihlašování skončilo</div>
                    )}
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
                        <div className="flex w-full justify-center">
                            <button
                                className="text-sm text-sky-400"
                                onClick={() => setIsAddHostModal(true)}
                            >
                                Přidat hosta
                            </button>
                            <button
                                className="ml-4 text-sm text-sky-400"
                                onClick={() => setIsEditAttendanceModal(true)}
                            >
                                Upravit docházku
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
