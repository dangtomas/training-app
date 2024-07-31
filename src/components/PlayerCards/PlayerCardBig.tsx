export default function Big(props: { name: string; profilePicSrc: string }) {
    return (
        <div className="flex w-full flex-row items-center justify-between p-8">
            <div className="rounded-full border border-gray-400">
                <img
                    className="h-20 w-20 rounded-full"
                    src={props.profilePicSrc}
                />
            </div>
            <h2 className="flex-1 pl-4 text-2xl font-bold">{props.name}</h2>
        </div>
    );
}
