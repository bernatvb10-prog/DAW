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

        props.edit?.(song);
    }

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{formatDuration(props.duration)}</td>
            {props.play && <td><button type="button" onClick={props.play}>Play</button></td>}
            {props.edit && <td><button type="button" onClick={editar}>Edit</button></td>}
            {props.delete && <td><button type="button" onClick={props.delete}>Delete</button></td>}
        </tr>
    )
}

export default SongRow;