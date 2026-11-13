import { Like } from "../interfaces/like/like";

export function isValidLike(like: Like): boolean {
    return Boolean(
        like &&
        like.user &&
        like.track &&
        (like.likeTrack === 1 || like.likeTrack === -1)
    );
}
