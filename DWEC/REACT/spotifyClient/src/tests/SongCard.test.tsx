import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SongCard from "../Components/Songs/SongCard";
import type { TrackView } from "../Components/Songs/Types/TrackView";

describe("SongCard", () => {
  it("renders the title, artist, duration and play count", () => {
    const track: TrackView = {
      title: "Sunday bloody Sunday",
      artist: "U2",
      duration: 180,
      reproduccions: 4567,
    };

    render(<SongCard trackInfo={track} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Sunday bloody Sunday" }),
    ).toBeTruthy();
    expect(screen.getByText("U2")).toBeTruthy();
    expect(screen.getByText("180")).toBeTruthy();
    expect(screen.getByText("Total Reproduccions: 4567")).toBeTruthy();
  });

  it("displays zero reproductions without hiding the value", () => {
    const track: TrackView = {
      title: "New track",
      artist: "New artist",
      duration: 1,
      reproduccions: 0,
    };

    render(<SongCard trackInfo={track} />);

    expect(screen.getByText("Total Reproduccions: 0")).toBeTruthy();
  });
});
