import PlayerCardProps from "../types/PlayerCardProps";

function PlayerCardBig(props: PlayerCardProps) {
    return (
        <div id="player-card-big">
            <div id="profile-pic-big">
                <img src={props.profilePicSrc}/>
            </div>
            <h2>{props.name}</h2>
        </div>
    )
}

export default PlayerCardBig;