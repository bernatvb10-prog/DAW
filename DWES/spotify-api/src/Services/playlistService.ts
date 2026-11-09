import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../config/database";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccessService";
import { ErrorService } from "../interfaces/error/errorService";
import { UpdateSuccessService } from "../interfaces/error/updateSuccessService";
import { Playlist } from "../interfaces/playlist/playlist";
import { PlaylistBD } from "../interfaces/playlist/playlistBD";
import { isValidPlaylist } from "../validators/playlist.validator";

async function userExists(userId: string): Promise<boolean> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("user_id", sql.UniqueIdentifier, userId);

    const result: IResult<{ id: string }> = await request.query(
        "SELECT id FROM [User] WHERE id = @user_id"
    );
    return result.recordset.length > 0;
}

export async function getAllPlaylists(): Promise<PlaylistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `SELECT id, title, user_id AS [user] FROM Playlist`;

    const result: IResult<PlaylistBD> = await request.query(queryText);
    return result.recordset;
}

export async function getPlaylistById(idPlaylist: string): Promise<PlaylistBD | undefined> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylist);

    const queryText: string = `SELECT id, title, user_id AS [user] FROM Playlist WHERE id = @id`;
    const result: IResult<PlaylistBD> = await request.query(queryText);
    return result.recordset[0];
}

export async function createPlaylist(
    playlist: Playlist
): Promise<CreateSuccessService<PlaylistBD> | ErrorService> {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    if (!(await userExists(playlist.user))) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const title: string = playlist.title.trim().replace(/\s+/g, " ");
    request.input("title", sql.NVarChar, title);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);

    const queryText: string = `INSERT INTO Playlist(title, user_id)
        OUTPUT INSERTED.id, INSERTED.title, INSERTED.user_id AS [user]
        VALUES(@title, @user_id)`;
    const result: IResult<PlaylistBD> = await request.query(queryText);

    return { success: true, code: 201, data: result.recordset[0] };
}

export async function putPlaylistById(
    playlist: Playlist,
    idPlaylist: string
): Promise<UpdateSuccessService<number> | ErrorService> {
    if (!isValidPlaylist(playlist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    if (!(await userExists(playlist.user))) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const title: string = playlist.title.trim().replace(/\s+/g, " ");
    request.input("title", sql.NVarChar, title);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);
    request.input("id", sql.UniqueIdentifier, idPlaylist);

    const queryText: string = `UPDATE Playlist SET title = @title, user_id = @user_id WHERE id = @id`;
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function deletePlaylist(idPlaylist: string): Promise<DeleteSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("id", sql.UniqueIdentifier, idPlaylist);

    const queryText: string = `DELETE FROM Playlist WHERE id = @id`;
    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Playlist not found" };
    }

    return { success: true, code: 204 };
}
