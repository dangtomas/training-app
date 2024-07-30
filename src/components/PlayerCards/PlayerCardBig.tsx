export default function Big(props: { name: string; profilePicSrc: string }) {
    return (
        <div className="box flex-row p-8">
            <div className="h-20 w-20 rounded-full border border-gray-400">
                <img className="rounded-full" src={props.profilePicSrc} />
            </div>
            <h2 className="flex-1 pl-4 text-2xl font-bold">{props.name}</h2>
        </div>
    );
}
