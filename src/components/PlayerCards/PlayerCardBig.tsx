import Image from "next/image";

export default function Big(props: { name: string; profilePicSrc: string }) {
    return (
        <div className="flex w-full flex-row items-center justify-between p-8">
            <div className="rounded-full border border-gray-400">
                <Image
                    className="h-20 w-20 rounded-full"
                    src={props.profilePicSrc}
                    height={80}
                    width={80}
                    alt="profile pic"
                ></Image>
            </div>
            <h2 className="flex-1 pl-4 text-2xl font-bold">{props.name}</h2>
        </div>
    );
}
