export function generateProgressPercentage(completed: number, total: number) {
  return Math.round((total /completed) * 100);
}
