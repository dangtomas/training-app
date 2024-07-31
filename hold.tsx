function xd() {
    return (
        <form className="box mt-24 items-start" onSubmit={editProfileWithId}>
            <PlayerCardBig
                name={user.name}
                profilePicSrc={user.profilePicSrc}
            />
            <div className="w-full px-6 pb-4">
                <h3 className="text-xl font-bold">Přihlašovací jméno</h3>
                <span className="block pb-3">{user.username}</span>
                <h3 className="pb-1 text-xl font-bold">Jméno</h3>
                <input
                    className="w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="text"
                    defaultValue={user.name}
                    required
                    name="name"
                    minLength={4}
                />
                <h3 className="mt-4 pb-1 text-xl font-bold">Heslo</h3>
                <input
                    className="w-full rounded-sm border border-gray-400 px-2 py-0.5"
                    type="password"
                    name="password"
                    minLength={4}
                />
                <button
                    type="submit"
                    className="mb-4 mt-8 w-full rounded-sm bg-black p-2 text-white hover:bg-stone-800"
                >
                    Změnit
                </button>
            </div>
        </form>
    );
}
