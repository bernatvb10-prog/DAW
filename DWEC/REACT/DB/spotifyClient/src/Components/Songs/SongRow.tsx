import type { SongRowProps } from "./Types/SongRowProps";
import { formatDuration } from "../../Utils/formatDuration";


const SongRow = (props:SongRowProps) => {

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{formatDuration(props.duration)}</td>
            <td><button type="button" onClick={props.play}>Play</button></td>
        </tr>
    )
}

export default SongRow;