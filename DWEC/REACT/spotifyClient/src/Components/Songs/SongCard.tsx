import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likeBlanc from "../../assets/like_blanc.png";
import likeVerd from "../../assets/like_verd.png";

const SongCard = ({ trackInfo }: SongCardProps) => {

    let [totalReproduccions, setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    const [liked, setLiked] = useState(false);

    function handleClickPlay() {
        const tr = (prev: number) => { return prev + 1 };
        setTotalReproduccions(tr);
    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Total Reproduccions: {totalReproduccions}</p>
            <p><button onClick={handleClickPlay}>Play</button></p>
            <button
                type="button"
                onClick={() => setLiked(!liked)}
            >
                <img src={liked ? likeVerd : likeBlanc} alt="" width="24" height="24" />
            </button>
        </>
    )
}

export default SongCard;