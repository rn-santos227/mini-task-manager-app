export function removeAt(arr, index) {
  return arr.filter((_, i) => i !== index);
}

export function unique(arr) {
  return [...new Set(arr)];
}
