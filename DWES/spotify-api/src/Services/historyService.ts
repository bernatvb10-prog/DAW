import { histories } from "../data/history/history";
import { CreateSuccessService } from "../interfaces/error/createSucessService";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { History } from "../interfaces/history/history";
import { isValidHistory } from "../validators/history.validator";
import sql, { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";


export function getAllHistories(): HistoryBD[] {
    return histories;
}

export function getHistoryById(idHistory: string): HistoryBD | undefined {
    return histories.find((h: HistoryBD) => { return h.id === idHistory });
}

export function createHistory(history: History): CreateSuccessService | ErrorService {

    if (!isValidHistory(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }


    return { success: true, code: 201, data: 1 };
}


export async function addTrackUserHistory(historyTrack: History): Promise<CreateSuccessService | ErrorService> {

    if (!isValidHistory(historyTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO History(user_id, track_id)
        VALUES(@user_id,@track_id)
    `;

    request.input("user_id", sql.UniqueIdentifier, historyTrack.user);
    request.input("track_id", sql.UniqueIdentifier, historyTrack.track);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] };

}