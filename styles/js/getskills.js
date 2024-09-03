import { GetLastLevelSkills } from "./getlevelskills.js";

export function GetTSkills(data) {
  let recupSkills = data.data.user[0].transactions;
  // console.log(recupSkills);

  let TotalSkills = [];
  let amountskill = 0;

  for (let i = 0; i < recupSkills.length; i++) {
    if (recupSkills[i].path && recupSkills[i].type.includes("skill_")) {
      // console.log(`Transaction ${i} matches:`, recupSkills[i].type);
      TotalSkills.push(recupSkills[i].type);
      if ("amount" in recupSkills[i]) {
        TotalSkills.push(recupSkills[i].amount);
        amountskill += recupSkills[i].amount;
      }
    }
  }

  console.log(TotalSkills);
  console.log(amountskill);

  return GetLastLevelSkills(TotalSkills);
}
