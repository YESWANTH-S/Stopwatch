const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const lapRecord = document.querySelector("#lapRecord");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;
let i = 0;
let lapNow = null;

startBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1);
    startBtn.innerHTML = "Stop";
  } else {
    paused = true;
    elapsedTime = Date.now() - startTime;
    clearInterval(intervalId);
    startBtn.innerHTML = "Start";
  }
});
resetBtn.addEventListener("click", () => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  ms = 0;
  i = 0;
  startBtn.innerHTML = "Start";
  lapRecord.innerHTML = "";
  timeDisplay.textContent = "00:00:00:00";
});

lapBtn.addEventListener("click", lap);

function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  ms = Math.floor(elapsedTime % 60);

  secs = pad(secs);
  mins = pad(mins);
  hrs = pad(hrs);
  ms = pad(ms);

  timeDisplay.textContent = `${hrs}:${mins}:${secs}:${ms}`;

  function pad(unit) {
    return ("0" + unit).length > 2 ? unit : "0" + unit;
  }
}

function lap() {
  lapNow = `<div class ="laps">${hrs}:${mins}:${secs}:${ms}</div>`;
  if (i == 0) {
    lapRecord.innerHTML += "<br>";
    lapRecord.innerHTML += lapNow;
    i = 1;
  } else lapRecord.innerHTML += lapNow;
}

var bg = [  
  "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)",
  "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
  "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
  "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
  "linear-gradient(to right, #4A00E0, #8E2DE2)",
  "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
];
var n = 0;
document.getElementById("colorBtn").addEventListener("click", function () {
  if (n <=bg.length -2) {
    n = ++n;
  } else {
    n = 0;
  }
  document.body.style.backgroundImage = bg[n];
});
