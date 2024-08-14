import { Dispatch, SetStateAction, useEffect, useState } from "react";
import User from "@/types/User";
import fetchMembers from "@/utils/api/fetchMembers";
import editAttendance from "@/utils/api/editAttendance";

export default function DeleteTrainingModal(props: {
    trainingId: string;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    setIsEditAttendanceModal: Dispatch<SetStateAction<boolean>>;
}) {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        fetchMembers([], true).then((result) => {
            setMembers(result);
            console.log(result);
        });
    }, []);

    async function handleEdit(userId: string, push: boolean) {
        try {
            await editAttendance(userId, props.trainingId, push);
        } catch {
            alert("Nepovedlo se upravit docházku 😔");
        } finally {
            props.setUpdate((a) => !a);
            props.setIsEditAttendanceModal(false);
        }
    }

    return (
        <div className="no-doc-scroll fixed top-0 flex h-full w-full items-center bg-[rgba(0,0,0,0.5)]">
            {members.length === 0 ? (
                <div className="box mt-3 py-[160px] text-2xl">Načítání...</div>
            ) : (
                <div className="box flex w-[95vw] max-w-[600px] flex-col items-center py-2">
                    <h3 className="text-xl font-bold">Upravit docházku</h3>
                    {members.map((m) => {
                        return (
                            <div
                                key={m._id}
                                className="flex w-[97%] justify-between border-b border-gray-400 py-1"
                            >
                                {m.name}
                                <div>
                                    <button
                                        className="text-sky-500"
                                        onClick={() => {
                                            handleEdit(m._id, true);
                                        }}
                                    >
                                        Přidat
                                    </button>
                                    <button
                                        className="pl-2 text-red-500"
                                        onClick={() => {
                                            handleEdit(m._id, false);
                                        }}
                                    >
                                        Odebrat
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <button
                        className="pt-2 text-lg text-sky-500"
                        onClick={() => {
                            props.setIsEditAttendanceModal(false);
                        }}
                    >
                        Zrušit
                    </button>
                </div>
            )}
        </div>
    );
}
