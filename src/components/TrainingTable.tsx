import Training from "@/types/Training";
import User from "@/types/User";
import fetchMembersWithHosts from "@/utils/api/fetchMembersWithHosts";
import { useState, useEffect } from "react";
import { generateDateStringTable } from "@/utils/dateHelper";
import calculatePrice from "@/utils/calculatePrice";

export default function TrainingTable(props: { trainings: Training[] }) {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        fetchMembersWithHosts(props.trainings).then((result) => {
            setMembers(result);
        });
    }, []);

    return (
        <div className="w-full overflow-x-auto">
            <table className="mx-auto mt-4 overflow-scroll break-words rounded-lg border border-gray-400 bg-white text-center text-sm">
                <thead>
                    <tr>
                        <th className="w-[150px]"></th>
                        {props.trainings.map((t) => {
                            return (
                                <th
                                    className="min-w-[140px] max-w-[150px] py-1"
                                    key={t._id.toString()}
                                >
                                    {generateDateStringTable(
                                        new Date(t.date),
                                        t.duration,
                                        t.activity,
                                    )}
                                </th>
                            );
                        })}
                        <th className="min-w-[100px]">
                            Celkem <br /> {props.trainings.length}
                        </th>
                        <th className="min-w-[100px]">Celkem suma</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="min-w-[150px] font-bold">Počet hodin</td>
                        {props.trainings.map((t) => {
                            return (
                                <td key={t.duration + t._id}>
                                    {t.duration / 60}
                                </td>
                            );
                        })}
                        <td>
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.duration / 60;
                            }, 0)}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold">Počet kurtů</td>
                        {props.trainings.map((t) => {
                            return <td key={t._id + t.courts}>{t.courts}</td>;
                        })}
                        <td>
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.courts;
                            }, 0)}
                        </td>
                    </tr>
                    {members.map((m) => {
                        return (
                            <tr>
                                <td>{m.name}</td>
                                {props.trainings.map((t) => {
                                    const includes = t.attendance.includes(
                                        m._id,
                                    );
                                    return (
                                        <td
                                            className={`${includes ? "bg-green-300" : "bg-red-400"} border border-white`}
                                        ></td>
                                    );
                                })}
                                <td>
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + 1
                                            : acc;
                                    }, 0)}
                                </td>
                                <td>
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + calculatePrice(el)
                                            : acc;
                                    }, 0)}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td>Celkem</td>
                        {props.trainings.map((t) => {
                            return (
                                <td key={t._id + t.attendance.length}>
                                    {t.attendance.length}
                                </td>
                            );
                        })}
                        <td>
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.attendance.length;
                            }, 0)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
