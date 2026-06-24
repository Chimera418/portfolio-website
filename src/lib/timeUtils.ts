export function getCurrentWeekKey(): string {
  const now = new Date();
  const ms = now.getTime();
  // Epoch was Thursday Jan 1 1970. Offset by 3 days to make weeks start on Monday midnight UTC.
  const offset = 3 * 24 * 60 * 60 * 1000;
  const weekNumber = Math.floor((ms + offset) / (7 * 24 * 60 * 60 * 1000));
  return `W${weekNumber}`;
}

export function getNextResetTime(): Date {
  const now = new Date();
  const ms = now.getTime();
  const offset = 3 * 24 * 60 * 60 * 1000;
  const weekNumber = Math.floor((ms + offset) / (7 * 24 * 60 * 60 * 1000));
  const nextResetMs = (weekNumber + 1) * (7 * 24 * 60 * 60 * 1000) - offset;
  return new Date(nextResetMs);
}
