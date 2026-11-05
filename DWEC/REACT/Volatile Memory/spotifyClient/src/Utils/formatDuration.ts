export function formatDuration(durationInSeconds: number): string {
  return `${Math.floor(durationInSeconds / 60)}:${durationInSeconds % 60}`;
}
