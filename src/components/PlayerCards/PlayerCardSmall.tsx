import Image from "next/image";

export default function PlayerCardSmall(props: {
    name: string;
    profilePicSrc: string;
}) {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="rounded-full border border-gray-400">
                <Image
                    className="h-11 w-11 rounded-full"
                    src={props.profilePicSrc}
                    height={44}
                    width={44}
                    alt="profile pic"
                ></Image>
            </div>
            <h4 className="flex-1 pl-4">{props.name}</h4>
        </div>
    );
}
