import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../config/database";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { PlaylistTrack } from "../interfaces/playlistTrack/playlistTrack";
import { PlaylistTrackBD } from "../interfaces/playlistTrack/playlistTrackBD";
import { isValidPlaylistTrack } from "../validators/playlistTrack.validator";

export async function createPlaylistTrack(
    playlistTrack: PlaylistTrack
): Promise<CreateSuccessService<PlaylistTrackBD> | ErrorService> {
    if (!isValidPlaylistTrack(playlistTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const validationRequest: sql.Request = pool.request();
    validationRequest.input("playlist_id", sql.UniqueIdentifier, playlistTrack.playlist);
    validationRequest.input("track_id", sql.UniqueIdentifier, playlistTrack.track);

    const validationQuery: string = `SELECT
            CAST(CASE WHEN EXISTS(SELECT 1 FROM Playlist WHERE id = @playlist_id) THEN 1 ELSE 0 END AS bit) AS playlistExists,
            CAST(CASE WHEN EXISTS(SELECT 1 FROM Track WHERE id = @track_id) THEN 1 ELSE 0 END AS bit) AS trackExists`;
    const validationResult: IResult<{ playlistExists: boolean; trackExists: boolean }> =
        await validationRequest.query(validationQuery);
    const relations: { playlistExists: boolean; trackExists: boolean } | undefined =
        validationResult.recordset[0];

    if (!relations?.playlistExists || !relations.trackExists) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const request: sql.Request = pool.request();
    request.input("playlist_id", sql.UniqueIdentifier, playlistTrack.playlist);
    request.input("track_id", sql.UniqueIdentifier, playlistTrack.track);

    const queryText: string = `INSERT INTO PlaylistTracks(playlist_id, track_id)
        OUTPUT INSERTED.id, INSERTED.playlist_id AS playlist, INSERTED.track_id AS track
        VALUES(@playlist_id, @track_id)`;
    const result: IResult<PlaylistTrackBD> = await request.query(queryText);

    return { success: true, code: 201, data: result.recordset[0] };
}

export async function deletePlaylistTrack(
    idPlaylistTrack: string
): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylistTrack);

    const queryText: string = `DELETE FROM PlaylistTracks WHERE id = @id`;
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "PlaylistTrack not found" };
    }

    return { success: true, code: 204 };
}
