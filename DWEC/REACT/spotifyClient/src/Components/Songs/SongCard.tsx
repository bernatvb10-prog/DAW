import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likeBlanc from "../../assets/like_blanc.png";
import likeVerd from "../../assets/like_verd.png";

const SongCard = ({ trackInfo }: SongCardProps) => {

    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    function handleClickPlay(reproduccions: number) {
        setTotalReproduccions((prev: number) => prev + reproduccions);
    }

    function handleClickLike() {
        setLikes((count) => count + (liked ? -1 : 1));
        setLiked(!liked);
    }

    function handleClickReset() {
        setTotalReproduccions(0);
        setLikes(0);
        setLiked(false);
    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button type="button" onClick={() => handleClickPlay(1)}>Play 1</button></p >
            <p><button type="button" onClick={() => handleClickPlay(5)}>Play 5</button></p >
            <p><button type="button" onClick={() => handleClickPlay(10)}>Play 10</button></p >
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