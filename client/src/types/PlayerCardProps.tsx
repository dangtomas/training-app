interface PlayerCardProps {
    name: string,
    profilePicSrc: string,
    host: {isHost: boolean, removeHost: (name: string) => void }
}

export default PlayerCardProps;