export default function PlayerCardSmall(props: {
    name: string;
    profilePicSrc: string;
}) {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="rounded-full border border-gray-400">
                <img
                    className="h-11 w-11 rounded-full"
                    src={props.profilePicSrc}
                ></img>
            </div>
            <h4 className="flex-1 pl-4">{props.name}</h4>
        </div>
    );
}
