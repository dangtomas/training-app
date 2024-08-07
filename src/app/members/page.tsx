import User from "@/models/User";
import dbConnect from "@/db/dbConnect";
import PlayerCardBig from "@/components/PlayerCards/PlayerCardBig";
import PlayerCardSmall from "@/components/PlayerCards/PlayerCardSmall";

export const dynamic = "force-dynamic";

dbConnect();

export default async function Members() {
    let users = await User.find({}).sort("name");
    const coach = await User.findOne({ _id: "668d082fbb6894b643abeb6b" });
    users = users.filter(
        (user) =>
            !user._id.equals(coach._id) &&
            !user._id.equals("669e2e4da78779b9287aaafd") &&
            !user._id.equals("66b3e5534bbc76f3225afb05"),
    );

    return (
        <>
            <div className="box mt-24">
                <PlayerCardBig
                    name={coach.name}
                    profilePicSrc={coach.profilePicSrc}
                />
            </div>
            <div className="box my-5 py-3">
                {users.map((user) => {
                    return (
                        <div className="w-full px-6 py-3" key={user._id}>
                            <PlayerCardSmall
                                name={user.name}
                                profilePicSrc={user.profilePicSrc}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
