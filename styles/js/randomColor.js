// Function to generate a random color
export function getRandomColor() {
  const getBrightValue = () => Math.floor(Math.random() * 156) + 100;
  const red = getBrightValue();
  const green = getBrightValue();
  const blue = getBrightValue();
  return `rgb(${red}, ${green}, ${blue})`;
}
