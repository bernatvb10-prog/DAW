import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { tracks } from "../Data/track";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App", () => {
  it("renders the selected track with a reproduction count in range", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.75)
      .mockReturnValueOnce(0.4567);

    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Sunday bloody Sunday" }),
    ).toBeTruthy();
    expect(screen.getByText("U2")).toBeTruthy();
    expect(screen.getByText("180")).toBeTruthy();
    expect(screen.getByText("Total Reproduccions: 4567")).toBeTruthy();
    expect(Math.random).toHaveBeenCalledTimes(2);
  });

  it("can select the first track and generate the minimum reproduction count", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0);

    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Rattle and hum" }),
    ).toBeTruthy();
    expect(screen.getByText("90")).toBeTruthy();
    expect(screen.getByText("Total Reproduccions: 0")).toBeTruthy();
  });

  it("can generate the maximum reproduction count", () => {
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.99999);

    render(<App />);

    expect(screen.getByText("Total Reproduccions: 9999")).toBeTruthy();
  });

  it("does not modify the source track data", () => {
    const originalTracks = structuredClone(tracks);
    vi.spyOn(Math, "random")
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(0.5);

    render(<App />);

    expect(tracks).toEqual(originalTracks);
  });
});
