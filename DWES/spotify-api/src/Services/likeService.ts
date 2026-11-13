import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { Like } from "../interfaces/like/like";
import { TrackLikeSummary } from "../interfaces/like/trackLikeSummary";
import { isValidLike } from "../validators/like.validator";

export async function getTrackLikeTotal(trackId: string): Promise<number> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("track_id", sql.UniqueIdentifier, trackId);

    const queryText: string = `SELECT COALESCE(SUM(likeTrack), 0) AS totalLikes
        FROM Likes
        WHERE track_id = @track_id`;
    const result: IResult<{ totalLikes: number }> = await request.query(queryText);
    return result.recordset[0].totalLikes;
}

export async function getTrackLikeSummary(trackId: string, userId: string): Promise<TrackLikeSummary> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("track_id", sql.UniqueIdentifier, trackId);
    request.input("user_id", sql.UniqueIdentifier, userId);

    const queryText: string = `SELECT
        COALESCE(SUM(likeTrack), 0) AS totalLikes,
        COALESCE(SUM(CASE WHEN user_id = @user_id THEN likeTrack ELSE 0 END), 0) AS userLike
        FROM Likes
        WHERE track_id = @track_id`;
    const result: IResult<TrackLikeSummary> = await request.query(queryText);
    return result.recordset[0];
}

export async function addTrackUserLike(like: Like): Promise<CreateSuccessService<TrackLikeSummary> | ErrorService> {
    if (!isValidLike(like)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    request.input("user_id", sql.UniqueIdentifier, like.user);
    request.input("track_id", sql.UniqueIdentifier, like.track);
    request.input("likeTrack", sql.Int, like.likeTrack);

    const queryText: string = `INSERT INTO Likes(user_id, track_id, [date], likeTrack)
        VALUES(@user_id, @track_id, GETDATE(), @likeTrack)`;
    await request.query(queryText);

    const summary: TrackLikeSummary = await getTrackLikeSummary(like.track, like.user);
    return { success: true, code: 201, data: summary };
}
