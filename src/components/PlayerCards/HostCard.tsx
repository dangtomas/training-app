import updateAttendance from "@/utils/api/updateAttendance";
import { Dispatch, SetStateAction } from "react";

export default function HostCard(props: {
    name: string;
    hostId: string;
    trainingId: string;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="flex flex-row items-center">
            <div className="h-11 w-11 rounded-full border border-gray-400"></div>
            <h4 className="flex-1 pl-4">
                {props.name}{" "}
                <button
                    className="pl-2"
                    onClick={async () => {
                        await updateAttendance(
                            props.hostId,
                            props.trainingId,
                            false,
                        );
                        props.setUpdate((a) => !a);
                    }}
                >
                    ❌
                </button>
            </h4>
        </div>
    );
}
