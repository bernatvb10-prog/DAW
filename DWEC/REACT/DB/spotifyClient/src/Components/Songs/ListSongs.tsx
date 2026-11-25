import type { GETTrack } from "../../APIManagement/Tracks/Interfaces/Track";
import SongRow from "./SongRow";
import type { SongListProps } from "./Types/SongListProps";

const ListSongs = (props: SongListProps) => {

    return (
        <>
            {
                props.tracks.map(
                    (t: GETTrack) => {
                        return <SongRow
                            id={t.id}
                            key={t.id}
                            title={t.title}
                            artist={t.artist}
                            artist_id={t.artist_id}
                            duration={t.duration}
                            play={() => props.play(t)}
                            edit={props.edit}
                            delete={props.delete ? () => props.delete?.(t) : undefined}
                        />
                    }
                )
            }
        </>
    )
}

export default ListSongs;