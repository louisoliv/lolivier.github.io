export function ToTitle(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
}
