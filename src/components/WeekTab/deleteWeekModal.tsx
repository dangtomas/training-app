import { Dispatch, SetStateAction, useContext } from "react";
import UpdateContext from "@/utils/updateContext";
import deleteWeek from "@/utils/api/deleteWeek";
import { getDateInterval } from "@/utils/dateHelper";

export default function DeleteWeekModal(props: {
    name: string;
    from: Date;
    to: Date;
    weekId: string;
    setIsDeleteModal: Dispatch<SetStateAction<boolean>>;
}) {
    const updatePage = useContext(UpdateContext);

    async function handleDelete() {
        try {
            await deleteWeek(props.weekId);
            if (updatePage != null) {
                updatePage();
            }
        } catch (err) {
            alert("Nepovedlo se odstranit týden 😔");
        } finally {
            props.setIsDeleteModal(false);
        }
    }

    return (
        <div className="no-doc-scroll fixed bottom-0 flex h-screen w-full items-center bg-[rgba(0,0,0,0.5)]">
            <div className="box flex w-[360px] flex-col py-5">
                <h3 className="text-xl font-bold">
                    Opravdu chceš smazat týden?
                </h3>
                <h3 className="pb-1 pt-0.5 text-xl">
                    {props.name ? props.name + " (" : ""}
                    {getDateInterval(props.from, props.to)}
                    {props.name ? ")" : ""}
                </h3>
                <button
                    type="button"
                    className="my-2 bg-red-500 px-2 text-lg text-white"
                    onClick={handleDelete}
                >
                    Ano
                </button>
                <button
                    className="text-lg text-sky-500"
                    onClick={() => {
                        props.setIsDeleteModal(false);
                    }}
                >
                    Zrušit
                </button>
            </div>
        </div>
    );
}
