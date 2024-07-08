import PlayerCardProps from "../types/PlayerCardProps";

function PlayerCardSmall(props: PlayerCardProps) {
    return (
        <div className="player-card-small">
            <div className="profile-pic-small">
                <img src={props.profilePicSrc}/>
            </div>
            <span className="player-card-small-name">{props.name}</span>
            <button className="remove-host" 
                    onClick={() => props.host.removeHost(props.name)}>
                {props.host.isHost ? "❌" : ""}
            </button>
        </div>
    )
}

export default PlayerCardSmall;