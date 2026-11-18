import type { SongRowProps } from "./Types/SongRowProps";
import { formatDuration } from "../../Utils/formatDuration";
import type { Track } from "../../Model/Track";


const SongRow = (props: SongRowProps) => {

    function editar() {
        const song: Track = {
            id: props.id,
            title: props.title,
            artist_name: props.artist,
            artist_id: props.artist_id,
            duration: props.duration
        };

        props.edit(song);
    }

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{formatDuration(props.duration)}</td>
            <td><button type="button" onClick={props.play}>Play</button></td>
            <td><button onClick={editar}>Edit</button></td>
        </tr>
    )
}

export default SongRow;