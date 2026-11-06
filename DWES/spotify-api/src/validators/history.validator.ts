import { History } from "../interfaces/history/history";

export function isValidHistory(history: History): boolean | string | undefined {
    if (!history) {
        return false;
    }

    if (!history.user || !history.track) {
        return false;
    }

    return true;
}
