import { Dispatch, SetStateAction } from "react";
import updateAttendance from "@/utils/api/updateAttendance";

export default function AddHostModal(props: {
    trainingId: string;
    setIsAddHostModal: Dispatch<SetStateAction<boolean>>;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="no-doc-scroll fixed top-0 flex h-full w-full items-center bg-[rgba(0,0,0,0.5)]">
            <div className="box flex w-[300px] flex-col items-center py-4">
                <form
                    className="flex flex-col items-center"
                    action={async (formData: FormData) => {
                        await updateAttendance(
                            `HOST-${formData.get("hostName")}`,
                            props.trainingId,
                            true,
                        );
                        props.setIsAddHostModal(false);
                        props.setUpdate((a) => !a);
                    }}
                >
                    <h2 className="w-full pb-1 text-center font-bold">
                        Přidat hosta
                    </h2>
                    <input
                        className="mb-3 w-full rounded-sm border border-gray-400 px-2"
                        type="text"
                        name="hostName"
                        required
                    />
                    <button
                        type="submit"
                        className="mb-1 rounded-sm bg-black px-2 py-0.5 text-white"
                    >
                        Přidat
                    </button>
                </form>
                <button
                    className="text-sky-500"
                    onClick={() => {
                        props.setIsAddHostModal(false);
                    }}
                >
                    Zrušit
                </button>
            </div>
        </div>
    );
}
