export function GetLastLevelSkills(data) {
  // console.log(data);

  let maxAmount = {};

  for (let i = 0; i < data.length; i += 2) {
    let skill = data[i];
    let amount = data[i + 1];
    if (!maxAmount[skill] || amount > maxAmount[skill]) {
      maxAmount[skill] = amount;
    }
  }
  // console.log(maxAmount);
  return maxAmount;
}
