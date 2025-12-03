export function formatNumber(num) {
  return Number(num).toLocaleString();
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
