export interface AddLike {
    user: string;
    track: string;
    likeTrack: 1 | -1;
}

export interface TrackLikeSummary {
    totalLikes: number;
    userLike: number;
}

export interface TrackLikeTotal {
    totalLikes: number;
}
