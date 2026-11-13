import type { Like } from "./Like";

export interface TrackView {
    id?: string;
    title: string;
    artist: string;
    duration: number;
    likes: Like;
    reproduccions: number;
}