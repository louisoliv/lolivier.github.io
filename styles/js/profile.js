import { query1 } from "./queries.js";
import { query2 } from "./queries.js";
import { query3 } from "./queries.js";
import { query4 } from "./queries.js";
import { GetTSkills } from "./getskills.js";
import { ToTitle } from "./totitle.js";
import { getRandomColor } from "./randomColor.js";
import { CSSHandler } from "./setCSS.js";
import { UserProfile } from "./userprofile.js";

const page = document.getElementById("conainer");

export async function Profile(response) {
  const body = document.querySelector("body");
  body.style.fontFamily = "IBM Plex Mono, monospace";
  body.style.color = "white";

  const data = await FetchDataProfile(response);

  let [dataTransac, allAmountDisplay] = await FetchDataUserTransaction(
    response
  );
  // console.log("typeof :", dataTransac);

  allAmountDisplay = allAmountDisplay * 1e-3;

  allAmountDisplay = Math.round(allAmountDisplay);
  // console.log(allAmountDisplay);
  page.innerHTML = "";
  // page.style.background = "yellow";
  page.style.backgroundColor = "rgb(39, 38, 38)";
  page.style.color = "whithe";

  const divLogo01 = document.createElement("div");
  divLogo01.style.display = "flex";
  divLogo01.style.justifyContent = "center";
  divLogo01.style.padding = "15px";
  const logo01 = document.createElement("img");
  logo01.src = "./styles/img/logo.png";
  // logo01.width = 100;
  divLogo01.appendChild(logo01);

  const logoUserDiv = document.createElement("div");
  logoUserDiv.id = "logoUserDiv";
  logoUserDiv.style.cursor = "pointer";
  logoUserDiv.style.zIndex = "100";
  logoUserDiv.style.marginRight = "1vw";
  logoUserDiv.style.marginLeft = "1vw";

  const logoGitDiv = document.createElement("div");
  logoGitDiv.id = "logoGitDiv";
  logoGitDiv.style.cursor = "pointer";
  logoGitDiv.style.zIndex = "100";
  logoGitDiv.style.marginRight = "1vw";
  logoGitDiv.style.marginLeft = "1vw";

  const logoUserSvg = document.createElement("img");
  logoUserSvg.id = "logoUserSvg";
  logoUserSvg.src = "./styles/img/logoUser.svg";
  logoUserSvg.style.cursor = "pointer";
  logoUserDiv.appendChild(logoUserSvg);

  const logoOutDiv = document.createElement("div");
  logoOutDiv.id = "logoOutDiv";
  logoOutDiv.style.cursor = "pointer";
  logoOutDiv.style.zIndex = "100";
  logoOutDiv.style.marginRight = "1vw";
  logoOutDiv.style.marginLeft = "1vw";

  const logoOutrSvg = document.createElement("img");
  logoOutrSvg.src = "./styles/img/logOut.svg";
  logoOutDiv.appendChild(logoOutrSvg);

  const gitLogoSvg = document.createElement("img");
  gitLogoSvg.src = "./styles/img/gitLogo.svg";
  logoGitDiv.appendChild(gitLogoSvg);

  const divLogoHeader = document.createElement("div");
  divLogoHeader.id = "divLogoHeader";
  divLogoHeader.backgroundColor = "blue";
  divLogoHeader.style.display = "flex";
  divLogoHeader.style.alignItems = "center";
  divLogoHeader.style.justifyContent = "center";
  divLogoHeader.style.className = "card";
  divLogoHeader.style.width = "15vw";

  const allInfoUserDiv = document.createElement("div");
  allInfoUserDiv.id = "allInfoUserDiv";
  allInfoUserDiv.style.display = "none";
  allInfoUserDiv.style.backgroundColor = "gery";

  const header = document.createElement("div");
  header.id = "divHeader";
  // header.style.backgroundColor = "red";
  header.style.height = "8vh";
  // header.style.width = "100%";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.width = "90%";

  header.appendChild(divLogo01);
  // divLogoHeader.appendChild(logoUserSvg);
  divLogoHeader.appendChild(logoUserDiv);
  divLogoHeader.appendChild(logoOutDiv);
  divLogoHeader.appendChild(logoGitDiv);
  header.appendChild(divLogoHeader);

  logoUserDiv.addEventListener("click", async () => {
    const allInfoContainer = document.getElementById("allInfoUserDiv");
    allInfoContainer.style.display = "flex";
    allInfoContainer.style.float = "right";
    allInfoContainer.style.zIndex = "1000";
    allInfoContainer.style.position = "fixed";
    allInfoContainer.style.padding = "20px";
    allInfoContainer.style.float = "right";
    allInfoContainer.style.right = "0";
    allInfoContainer.style.top = "0";
    allInfoContainer.style.height = "97vh";
    allInfoContainer.style.width = "40vw";
    allInfoContainer.style.overflowY = "auto";
    allInfoContainer.style.backgroundColor = "rgb(39, 38, 38)";
    allInfoContainer.style.animation =
      "slideLeft-01 2s ease-in-out, show-01 2s ease-in-out";

    if (!document.getElementById("allinfoTitleQuit")) {
      const DataPersoProfile = await FetchDataUserProfile(response);
      console.log(
        "Data from the fetch user perso profile attrs",
        DataPersoProfile
      );

      const allinfoTitleQuit = document.createElement("div");
      allinfoTitleQuit.id = "allinfoTitleQuit";
      // allinfoTitleQuit.style.backgroundColor = "orange";
      allinfoTitleQuit.style.width = "100%";
      allinfoTitleQuit.style.padding = "20px";

      const titleQuit = document.createElement("div");
      titleQuit.id = "titleQuit";
      titleQuit.style.innerText = "";
      // titleQuit.style.backgroundColor = "green";
      titleQuit.style.display = "flex";
      titleQuit.style.flexDirection = "row";
      titleQuit.style.justifyContent = "space-around";
      titleQuit.style.alignItems = "center";
      titleQuit.style.padding = "20px";

      const infoTitle = document.createElement("div");
      infoTitle.style.id = "infoTitle";
      infoTitle.style.fontSize = "30px";
      infoTitle.innerText = `${data.user[0].firstName} ${data.user[0].lastName}`;

      const quitDiv = document.createElement("div");
      quitDiv.innerText = "X";
      quitDiv.style.cursor = "pointer";

      quitDiv.addEventListener("click", () => {
        allInfoContainer.style.display = "none";
      });

      titleQuit.appendChild(infoTitle);
      titleQuit.appendChild(quitDiv);
      allinfoTitleQuit.appendChild(titleQuit);
      allInfoContainer.appendChild(allinfoTitleQuit);

      // Iterate through each key-value pair in DataPersoProfile
      for (const [key, value] of Object.entries(DataPersoProfile)) {
        const infoRow = document.createElement("div");
        infoRow.className = "infoRow";
        infoRow.style.display = "flex";
        infoRow.style.justifyContent = "space-between";
        infoRow.style.padding = "15px";
        infoRow.style.borderBottom = "1px solid #ccc";
        infoRow.style.marginBottom = "2vh";

        const keyDiv = document.createElement("div");
        keyDiv.className = "keyDiv";
        keyDiv.innerText = ToTitle(`${key}:`);
        keyDiv.style.fontSize = "15px";
        keyDiv.style.fontWeight = "bold";

        const valueDiv = document.createElement("div");
        valueDiv.className = "valueDiv";
        valueDiv.innerText = `${value}`;
        valueDiv.style.fontSize = "15px";

        infoRow.appendChild(keyDiv);
        infoRow.appendChild(valueDiv);

        allinfoTitleQuit.appendChild(infoRow);
      }

      allInfoContainer.appendChild(allinfoTitleQuit);
    }
  });

  logoOutDiv.addEventListener("click", () => {
    location.reload();
  });

  const divAllInfo = document.createElement("div");
  divAllInfo.id = "divAllInfo";
  divAllInfo.style.display = "flex";
  divAllInfo.style.flexDirection = "column";
  divAllInfo.style.height = "auto";
  divAllInfo.style.width = "100%";
  divAllInfo.style.marginTop = "3vh";

  const divRatioAmountDate = document.createElement("div");
  divRatioAmountDate.id = "divRatioAmountDate";

  divRatioAmountDate.style.display = "flex";
  divRatioAmountDate.style.justifyContent = "space-around";
  divRatioAmountDate.style.marginTop = "2vh";
  divRatioAmountDate.style.marginBottom = "2vh";

  const divAllSkills = document.createElement("div");
  divAllSkills.id = "divAllSkills";
  divAllSkills.style.display = "grid";
  divAllSkills.style.gridTemplateColumns = "repeat(4,1fr)";
  // grid-template-columns: repeat(3, 1fr);
  divAllSkills.style.flexDirection = "column";
  divAllSkills.style.height = "80vh";
  divAllSkills.style.width = "100%";

  const divSvgXpGraph = document.createElement("div");
  divSvgXpGraph.id = "divSvgXpGraph";
  divSvgXpGraph.style.display = "flex";
  divSvgXpGraph.style.height = "auto";
  divSvgXpGraph.style.width = "80%";

  const divWelcome = document.createElement("div");
  divWelcome.id = "divWelcome";
  divWelcome.style.fontFamily = "IBM Plex Mono, monospace";
  divWelcome.style.marginBottom = "2vh";
  divWelcome.style.marginTop = "3vh";
  divWelcome.style.marginLeft = "6vw";
  divWelcome.style.fontSize = "4rem";
  divWelcome.style.fontWeight = "300";

  divWelcome.innerText = `Welcome, ${data.user[0].firstName} ${data.user[0].lastName}`;

  const Ratio = document.createElement("div");
  Ratio.id = "Ratio";
  Ratio.style.width = "40%";
  Ratio.style.display = "flex";
  Ratio.style.flexDirection = "column";
  Ratio.style.justifyContent = "center";
  Ratio.style.padding = "10px";
  Ratio.style.textAlign = "center";
  Ratio.style.borderRadius = "4px";
  Ratio.style.backgroundColor = "rgb(245,245,245)";
  Ratio.style.color = "black";
  Ratio.className = "card";

  let auditRatio = data.user[0].auditRatio;
  auditRatio = auditRatio.toFixed(1);

  let totUp = data.user[0].totalUp;
  totUp = (totUp * 1e-6).toFixed(2);

  let totDown = data.user[0].totalDown;
  totDown = (totDown * 1e-6).toFixed(2);

  const auditRatioDiv = document.createElement("div");
  auditRatioDiv.id = "auditRatioDiv";
  auditRatioDiv.innerText = `Audit Ratio: ${auditRatio}`;

  const totUpDiv = document.createElement("div");
  totUpDiv.id = "totUpDiv";
  totUpDiv.innerText = `Total Up: ${totUp} Mb`;

  const totDownDiv = document.createElement("div");
  totDownDiv.id = "totDownDiv";
  totDownDiv.innerText = `Total Down: ${totDown} Mb`;

  const allAmountDiv = document.createElement("div");
  allAmountDiv.id = "allAmountDiv";
  allAmountDiv.className = "card";
  allAmountDiv.style.display = "flex";
  allAmountDiv.style.justifyContent = "center";
  allAmountDiv.style.alignItems = "center";
  allAmountDiv.innerText = `Total XP: ${allAmountDisplay} Kb`;
  allAmountDiv.style.backgroundColor = "rgb(55 50 50)";
  allAmountDiv.style.padding = "10px";

  // ------------------------------------------------------------------DATE PART

  const DATE = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  let currentDayOfWeek = DATE.getDay();
  let currentDay = daysOfWeek[currentDayOfWeek];
  // Current month (0 = January, 1 = February, ..., 11 = December)
  let currentMonth = ToTitle(DATE.toLocaleString("default", { month: "long" }));

  let numberOfDaysInMonth = DATE.getDate();

  const dateDiv = document.createElement("div");
  dateDiv.id = "dateDiv";
  dateDiv.className = "card";
  dateDiv.style.display = "flex";
  dateDiv.style.textAlign = "center";
  dateDiv.style.alignItems = "center";
  dateDiv.style.backgroundColor = "rgb(55 50 50)";
  dateDiv.style.padding = "10px";

  const dateDayMonthDiv = document.createElement("div");
  dateDayMonthDiv.id = "dateDayMonthDiv";
  dateDayMonthDiv.style.padding = "10px";

  const dateDayWeekDiv = document.createElement("div");
  dateDayWeekDiv.id = "dateDayWeekDiv";
  dateDayWeekDiv.style.padding = "10px";

  const dateWeekDiv = document.createElement("div");
  dateWeekDiv.id = "dateWeekDiv";
  dateWeekDiv.style.padding = "10px";

  const dateMonthDiv = document.createElement("div");
  dateMonthDiv.id = "dateMonthDiv";
  dateMonthDiv.style.padding = "10px";

  dateDayMonthDiv.innerHTML = currentDay;
  dateWeekDiv.innerHTML = numberOfDaysInMonth;
  dateMonthDiv.innerHTML = currentMonth;
  dateDayWeekDiv.appendChild(dateWeekDiv);
  dateDayMonthDiv.appendChild(dateMonthDiv);
  // dateDayWeekDiv.appendChild(dateMonthDiv);
  dateDiv.appendChild(dateDayWeekDiv);
  dateDiv.appendChild(dateDayMonthDiv);

  // ------------------------------------------------------------------END DATE PART

  // ------------------------------------------------------------------SVG LINE RATIO

  const svgDiv = document.createElement("div");
  svgDiv.id = "svgDiv";
  svgDiv.style.display = "flex";
  svgDiv.style.alignItems = "center"; // Align items vertically in the middle

  const svgDivLine = document.createElement("div");
  svgDivLine.id = "svgDivLine";

  const svgDivValues = document.createElement("div");
  svgDivValues.id = "svgDivValues";

  const svgNS = "http://www.w3.org/2000/svg"; // SVG namespace
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("height", "80px");
  svg.setAttribute("width", "185px");

  // Create the line elements
  const rect1 = document.createElementNS(svgNS, "rect");
  rect1.setAttribute("x", "0");
  rect1.setAttribute("y", "20");
  rect1.setAttribute("width", totUp * 100);
  rect1.setAttribute("height", "5");
  rect1.setAttribute("fill", "green");
  rect1.setAttribute("rx", "5");

  const rect2 = document.createElementNS(svgNS, "rect");
  rect2.setAttribute("x", "0");
  rect2.setAttribute("y", "60");
  rect2.setAttribute("width", totDown * 100);
  rect2.setAttribute("height", "5");
  rect2.setAttribute("fill", "red");
  rect2.setAttribute("rx", "5");

  svg.appendChild(rect1);
  svg.appendChild(rect2);

  // Append the SVG and values to their respective divs
  svgDivLine.appendChild(svg);
  svgDivValues.appendChild(totUpDiv);
  svgDivValues.appendChild(totDownDiv);

  // Append the line and values divs to the main svgDiv
  svgDiv.appendChild(svgDivLine);
  svgDiv.appendChild(svgDivValues);

  // ------------------------------------------------------------------END SVG LINE RATIO

  // ------------------------------------------------------------------Start info skills

  let dataSkills = await FetchDataUserTransactionSkills(response);
  console.log("Data skills:", dataSkills);

  Object.keys(dataSkills).forEach(async (key) => {
    console.log(key, dataSkills[key]);

    const svgCrcl1 = document.createElementNS(svgNS, "svg");
    svgCrcl1.setAttribute("class", "percentage-meter");
    svgCrcl1.setAttribute("height", "200px");
    svgCrcl1.setAttribute("width", "200px");

    const randomColor = getRandomColor();

    // Create the background circle (track)
    const track = document.createElementNS(svgNS, "circle");
    track.setAttribute("cx", "100");
    track.setAttribute("cy", "100");
    track.setAttribute("r", "90");
    track.setAttribute("class", "track");
    track.setAttribute("fill", "none");
    track.setAttribute("stroke", "#e6e6e6");
    track.setAttribute("stroke-width", "10");

    // Append the track circle to the SVG
    svgCrcl1.appendChild(track);

    // Create the foreground circle (path)
    const path = document.createElementNS(svgNS, "circle");
    path.setAttribute("cx", "100");
    path.setAttribute("cy", "100");
    path.setAttribute("r", "90");
    path.setAttribute("class", "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", randomColor); // Link to unique gradient
    path.setAttribute("stroke-width", "10");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-dasharray", "565.48"); // Circumference of the circle
    path.setAttribute("stroke-dashoffset", "565.48"); // Initially hide the entire stroke
    path.setAttribute("transform", "rotate(-90 100 100)");

    // Append the path circle to the SVG
    svgCrcl1.appendChild(path);

    const cardsvgSkillsDiv = document.createElement("div");
    cardsvgSkillsDiv.id = "cardsvgSkillsDiv";
    cardsvgSkillsDiv.className = "card";
    cardsvgSkillsDiv.style.display = "flex";
    cardsvgSkillsDiv.style.justifyContent = "center";
    cardsvgSkillsDiv.style.alignItems = "center";
    cardsvgSkillsDiv.style.position = "relative";

    const svgSkillsDiv = document.createElement("div");
    svgSkillsDiv.id = "svgSkillsDiv";
    svgSkillsDiv.style.display = "flex";
    svgSkillsDiv.style.flexDirection = "column";
    svgSkillsDiv.style.alignItems = "center";

    // svgSkillsDiv.style.backgroundColor = "pink";
    const svgSkillsDivValue = document.createElement("div");
    svgSkillsDivValue.id = "svgSkillsDivValue";
    svgSkillsDivValue.innerText = `${key}: ${dataSkills[key]}%`; // Show skill name and value
    svgSkillsDivValue.style.fontSize = "13px";

    svgCrcl1.style.top = "0";
    svgCrcl1.style.position = "absolute";
    svgCrcl1.style.padding = "5px";
    svgSkillsDiv.appendChild(svgCrcl1);
    svgSkillsDiv.appendChild(svgSkillsDivValue);

    // Function to set the percentage
    const setPercentage = async (percentage) => {
      const circumference = 2 * Math.PI * 90;
      const offset = circumference - (percentage / 100) * circumference;
      path.style.strokeDashoffset = offset;
    };

    await setPercentage(dataSkills[key]);

    // Append each skill's SVG to the main container

    cardsvgSkillsDiv.appendChild(svgSkillsDiv);
    divAllSkills.appendChild(cardsvgSkillsDiv);
  });

  // ------------------------------------------------------------------End info skills

  // ------------------------------------------------------------------Start XP Graph progression

  const dataTransacGraph = await FetchDataUserTransactionGraph(response);
  console.log(dataTransacGraph);
  // page.appendChild(divSvgXpGraph);

  // const container = document.getElementById("divSvgXpGraph");

  const margin = { top: 40, right: 80, bottom: 50, left: 50 }; // Define margins

  const svgWidth = 1000;
  const svgHeight = 600;
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;

  const svgXPProg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  svgXPProg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  svgXPProg.setAttribute("preserveAspectRatio", "xMinYMin meet");
  svgXPProg.style.width = "100%";
  svgXPProg.style.height = "auto";

  divSvgXpGraph.appendChild(svgXPProg);

  // Group for the actual graph (allows for margin adjustments)
  const graphGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );

  graphGroup.setAttribute(
    "transform",
    `translate(${margin.left}, ${margin.top})`
  );
  svgXPProg.appendChild(graphGroup);

  const xpValues = dataTransacGraph.map((item) => {
    const xp = item.xp; // Ensure the correct property is used
    return typeof xp === "number" ? (xp * 1e-3).toFixed(2) : 0; //
  });
  console.log("pxp values", xpValues);

  const dates = dataTransacGraph.map((item) => item.date);
  const maxDataValue = Math.max(...xpValues);
  const numPoints = xpValues.length;
  const pointGap = graphWidth / (numPoints - 1);

  // Scales
  const xScale = d3
    .scaleTime()
    .domain([new Date(dates[0]), new Date(dates[dates.length - 1])])
    .range([0, graphWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxDataValue])
    .range([graphHeight, 0]);

  // Axes
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(Math.floor(numPoints / 5))
    .tickFormat(d3.timeFormat("%Y-%m-%d"));

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(Math.floor(maxDataValue / 100))
    .tickFormat((d) => `${d} Kb`);

  // Append x-axis
  const xAxisGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  xAxisGroup.setAttribute("transform", `translate(0, ${graphHeight})`);
  graphGroup.appendChild(xAxisGroup);
  d3.select(xAxisGroup).call(xAxis);

  // Append y-axis
  const yAxisGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  yAxisGroup.setAttribute("transform", `translate(0, 0)`);
  graphGroup.appendChild(yAxisGroup);
  d3.select(yAxisGroup).call(yAxis);

  function generatePathData(xpValues, graphHeight, maxDataValue, pointGap) {
    let pathData = `M0 ${
      graphHeight - (xpValues[0] / maxDataValue) * graphHeight
    }`;
    xpValues.forEach((value, index) => {
      if (index > 0) {
        const x = index * pointGap;
        const y = graphHeight - (value / maxDataValue) * graphHeight;
        pathData += ` L${x} ${y}`;
      }
    });
    return pathData;
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    generatePathData(xpValues, graphHeight, maxDataValue, pointGap)
  );
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "teal");
  path.setAttribute("stroke-width", "2");

  graphGroup.appendChild(path);

  // Add circles and labels for each data point
  xpValues.forEach((value, index) => {
    const x = index * pointGap;
    const y = graphHeight - (value / maxDataValue) * graphHeight;

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "teal");

    graphGroup.appendChild(circle);

    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.setAttribute("x", x);
    label.setAttribute("y", y - 10);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "white");
    label.setAttribute("font-size", "9px");
    label.textContent = value;

    graphGroup.appendChild(label);
  });

  // ------------------------------------------------------------------End XP Graph progression

  // Final appending to the Ratio div
  Ratio.appendChild(auditRatioDiv);
  Ratio.appendChild(svgDiv); // Add the svgDiv containing all SVGs and values

  divRatioAmountDate.appendChild(Ratio);
  divRatioAmountDate.appendChild(allAmountDiv);
  divRatioAmountDate.appendChild(dateDiv);

  const containerData = document.getElementById("conainer");
  containerData.style.backgroundColor = "rgb(39, 38, 38)";
  containerData.style.height = "auto";
  containerData.style.display = "flex";
  containerData.style.justifyContent = "center";
  containerData.style.alignItems = "center";
  containerData.style.flexDirection = "column";

  document.getElementById("containerData").style.opacity = "0.2";

  // Add Ratio to the global div (divAllInfo)
  divAllInfo.appendChild(divWelcome);
  divAllInfo.appendChild(divRatioAmountDate);

  page.appendChild(header);
  page.appendChild(allInfoUserDiv);
  page.appendChild(divAllInfo);
  page.appendChild(divAllSkills);
  page.appendChild(divSvgXpGraph);
}

async function FetchDataProfile(response) {
  const responseData = await fetch(
    "https://zone01normandie.org/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response}`,
      },
      body: JSON.stringify(query1),
    }
  );
  const data = await responseData.json();
  console.log(data);

  if (data.error) {
    console.log("Error :", error);
  }
  return data.data;
}

async function FetchDataUserTransaction(response) {
  const responseData = await fetch(
    "https://zone01normandie.org/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response}`,
      },
      body: JSON.stringify(query2),
    }
  );
  const data = await responseData.json();
  console.log("Data from transactions :", data);
  // console.log("Data xp :", data.data.user[0].transactions);
  let allAmount = GetTypeXP(data);
  console.log(allAmount);
  if (data.error) {
    console.log("Error :", error);
  }
  return [data.data, allAmount];
}

function GetTypeXP(data) {
  console.log("Data xp :", data.data.user[0].transactions);
  let recup = data.data.user[0].transactions;

  let TotalXp = [];
  let allAmount = 0;

  for (let i = 0; i < recup.length; i++) {
    if (
      recup[i].type === "xp" &&
      recup[i].path &&
      !recup[i].path.includes("piscine-go/") &&
      !recup[i].path.includes("div-01/piscine-js/")
    ) {
      TotalXp.push(recup[i].type);
      if ("amount" in recup[i]) {
        TotalXp.push(recup[i].amount);
        allAmount += recup[i].amount;
      }
    }
  }

  console.log("TotalXp:", TotalXp);
  console.log("Total Amount of XP:", allAmount);
  return allAmount;
}

async function FetchDataUserTransactionSkills(response) {
  const responseData = await fetch(
    "https://zone01normandie.org/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response}`,
      },
      body: JSON.stringify(query2),
    }
  );
  const dataSkills = await responseData.json();
  console.log("Data from transactions :", dataSkills);
  console.log(dataSkills);
  // console.log("Data xp :", data.data.user[0].transactions);
  let skills = GetTSkills(dataSkills);
  return skills;
}

async function FetchDataUserTransactionGraph(response) {
  const responseData = await fetch(
    "https://zone01normandie.org/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response}`,
      },
      body: JSON.stringify(query3),
    }
  );
  const data = await responseData.json();
  console.log("Data from transactions for graph :", data);
  console.log("Data xp :", data.data.user[0].transactions);
  let allAmount = GetTypeXPGraphic(data);
  console.log(allAmount);

  return allAmount;
}

function GetTypeXPGraphic(data) {
  console.log("Data xp :", data.data.user[0].transactions);
  let recup = data.data.user[0].transactions;
  console.log(recup);

  let xpData = [];
  let cumulativeXp = 0;

  for (let i = 0; i < recup.length; i++) {
    if (
      recup[i].type === "xp" &&
      recup[i].path &&
      !recup[i].path.includes("piscine-go/") &&
      !recup[i].path.includes("div-01/piscine-js/") &&
      !recup[i].path.includes("checkpoint")
    ) {
      if ("amount" in recup[i]) {
        cumulativeXp += recup[i].amount;
        xpData.push({
          date: new Date(recup[i].createdAt), // Assuming createdAt is the date field
          xp: cumulativeXp,
        });
        console.log(recup[i].path);
      }
    }
  }

  console.log("Processed XP Data:", xpData);
  return xpData;
}

// ------------------------------------------------------------------Start All User info
async function FetchDataUserProfile(response) {
  const responseData = await fetch(
    "https://zone01normandie.org/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${response}`,
      },
      body: JSON.stringify(query4),
    }
  );
  const data = await responseData.json();
  console.log("Data from all attrs query :", data);
  let recupData = data.data.user[0].attrs;
  // console.log("Recup Data from user", recupData);
  return recupData;
}
