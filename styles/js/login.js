import { Profile } from "./profile.js";

const buttonLog = document.getElementById("buttonLog");

buttonLog.addEventListener("click", async function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await login(username, password);
});

//-------------------------------LOGIN

async function login(username, password) {
  let data = {
    username: username,
    password: password,
  };
  const response = await fetch("https://zone01normandie.org/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  }).then((response) => response.json());
  if (response.error) {
    createErrorDivLogin(response.error);
  } else {
    Profile(response);
  }
}

function createErrorDivLogin(error) {
  const existingDivError = document.getElementById("divErrorLogin");

  if (existingDivError) {
    // If the error div already exists, update its content
    existingDivError.innerText = error + " That's wrong";
  } else {
    // If the error div does not exist, create a new one
    const divError = document.createElement("div");
    const formData = document.getElementById("formLogDataArea");

    divError.id = "divErrorLogin";
    divError.style.background = "black";
    divError.style.color = "red";
    divError.style.padding = "10px";
    divError.style.margin = "2vh";
    divError.innerText = error + " That's wrong";

    formData.appendChild(divError);
  }
}

const video = document.getElementById("videoYT");

function adjustFontSize() {
  const body = document.body;

  if (window.matchMedia("(max-width: 767px)").matches) {
    // If the screen width is 600px or less (phone)
    body.style.fontSize = "14px";
    containerData.style.width = "100%";
    containerData.style.height = "100%";
    video.style.width = "350px";
    video.style.height = "200px";
  } else if (window.matchMedia("(max-width: 400px)").matches) {
    // If the screen width is 400px or less (small phone)
    body.style.fontSize = "12px";
    video.style.width = "350px";
    video.style.height = "200px";
  } else {
    // Default font size for larger screens
    body.style.fontSize = "16px";
  }
}

// Call the function to adjust the font size initially
adjustFontSize();

// Optionally, adjust the font size whenever the window is resized
window.addEventListener("resize", adjustFontSize);
