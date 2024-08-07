import Training from "@/types/Training";
import User from "@/types/User";
import fetchMembersWithHosts from "@/utils/api/fetchMembersWithHosts";
import { useState, useEffect } from "react";
import { generateDateStringTable } from "@/utils/dateHelper";
import calculatePrice, {
    calculateCourtPrice,
    calculateTrainerPrice,
} from "@/utils/calculatePrice";

export default function TrainingTable(props: { trainings: Training[] }) {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        fetchMembersWithHosts(props.trainings).then((result) => {
            setMembers(result);
        });
    }, [props.trainings]);

    return (
        <div className="w-full overflow-x-auto px-2 pb-4 text-center">
            <table className="mx-auto mt-4 overflow-scroll break-words border border-gray-400 bg-white text-sm">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="w-[150px] border border-white"></th>
                        {props.trainings.map((t) => {
                            return (
                                <th
                                    className="min-w-[140px] max-w-[150px] border border-white py-1"
                                    key={t._id + "date"}
                                >
                                    {generateDateStringTable(
                                        new Date(t.date),
                                        t.duration,
                                        t.activity,
                                    )}
                                </th>
                            );
                        })}
                        <th className="min-w-[100px] border border-white">
                            Celkem <br /> {props.trainings.length}
                        </th>
                        <th className="min-w-[65px] max-w-[65px] border border-white">
                            Celkem suma
                        </th>
                        <th className="min-w-[80px] max-w-[80px] border border-white">
                            Cena za trenéra
                        </th>
                        <th className="min-w-[70px] max-w-[70px] border border-white">
                            Cena za kurty
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-sky-200">
                        <td className="min-w-[150px] border border-white pl-1 text-start font-bold">
                            Počet hodin
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td key={t._id + "duration"}>
                                    {t.duration / 60}
                                </td>
                            );
                        })}
                        <td className="border border-white">
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.duration / 60;
                            }, 0)}
                        </td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Počet kurtů
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    className="border border-white"
                                    key={t._id + "courts"}
                                >
                                    {t.courts}
                                </td>
                            );
                        })}
                        <td className="border border-white">
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.courts;
                            }, 0)}
                        </td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    {members.map((m) => {
                        return (
                            <tr key={m._id + "playerRow"}>
                                <td className="border border-gray-300 pl-1 text-start">
                                    {m.name}
                                </td>
                                {props.trainings.map((t) => {
                                    const includes = t.attendance.includes(
                                        m._id,
                                    );
                                    return (
                                        <td
                                            key={t._id + m._id}
                                            className={`${includes ? "bg-green-300" : "bg-red-400"} border border-white`}
                                        ></td>
                                    );
                                })}
                                <td className="border border-gray-300">
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + 1
                                            : acc;
                                    }, 0)}
                                </td>
                                <td className="border border-gray-300 font-bold">
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + calculatePrice(el)
                                            : acc;
                                    }, 0)}
                                </td>
                                <td className="border border-gray-300">
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + calculateTrainerPrice(el)
                                            : acc;
                                    }, 0)}
                                </td>
                                <td className="border border-gray-300">
                                    {props.trainings.reduce((acc, el) => {
                                        return el.attendance.includes(m._id)
                                            ? acc + calculateCourtPrice(el)
                                            : acc;
                                    }, 0)}
                                </td>
                            </tr>
                        );
                    })}
                    <tr className="bg-amber-200">
                        <td className="border border-white pl-1 font-bold">
                            Celkem
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "attendanceLength"}
                                    className="border border-white"
                                >
                                    {t.attendance.length}
                                </td>
                            );
                        })}
                        <td>
                            {props.trainings.reduce((acc, el) => {
                                return acc + el.attendance.length;
                            }, 0)}
                        </td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-blue-600 text-white">
                        <td className="border border-white pl-1">Trenér</td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "empty"}
                                    className="border border-white"
                                ></td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-blue-600 text-white">
                        <td className="border border-white pl-1 text-start font-bold">
                            Standa Kohoutek
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "trainerPrice"}
                                    className="border border-white"
                                >
                                    {calculateTrainerPrice(t)}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Cena kurtů
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "trainerPrice"}
                                    className="border border-white"
                                >
                                    {calculateCourtPrice(t)}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Cena celkem
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "totalPrice"}
                                    className="border border-white"
                                >
                                    {calculateTrainerPrice(t) +
                                        calculateCourtPrice(t)}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Cena na hráče
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "pricePer"}
                                    className="border border-white"
                                >
                                    {t.attendance.length === 0
                                        ? 0
                                        : (calculateTrainerPrice(t) +
                                              calculateCourtPrice(t)) /
                                          t.attendance.length}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Kurty na hráče
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "courtsPer"}
                                    className="border border-white"
                                >
                                    {t.attendance.length === 0
                                        ? 0
                                        : calculateCourtPrice(t) /
                                          t.attendance.length}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                    <tr className="bg-sky-200">
                        <td className="border border-white pl-1 text-start font-bold">
                            Trenér na hráče
                        </td>
                        {props.trainings.map((t) => {
                            return (
                                <td
                                    key={t._id + "trainerPer"}
                                    className="border border-white"
                                >
                                    {t.attendance.length === 0
                                        ? 0
                                        : calculateTrainerPrice(t) /
                                          t.attendance.length}
                                </td>
                            );
                        })}
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                        <td className="border border-white"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
