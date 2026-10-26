import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likeBlanc from "../../assets/like_blanc.png";
import likeVerd from "../../assets/like_verd.png";

const SongCard = (props: SongCardProps) => {

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    function handleClickPlay() {
        props.play();
    }

    function handleClickLike() {
    }

    function handleClickReset() {
    }

    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>
            <p>Total Reproduccions: {props.trackInfo.reproduccions}</p>
            <p><button type="button" onClick={() => handleClickPlay()}>Play 1</button></p >
            <p><button onClick={handleClickReset}>Reset</button></p >

            <button
                type="button"
                onClick={handleClickLike}
            >
                <img src={liked ? likeVerd : likeBlanc} alt="" width="24" height="24" />
            </button>
            <span> {likes}</span>
        </>
    )
}

export default SongCard;