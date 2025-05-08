let startTime = 0;
let elapsed = 0;
let interval;
let isRunning = false;
let lapStart = 0;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

startPauseBtn.onclick = () => {
  if (!isRunning) {
    // Start the stopwatch
    startTime = Date.now() - elapsed;
    interval = setInterval(updateTime, 10);
    startPauseBtn.textContent = 'Pause';
    isRunning = true;
  } else {
    // Pause the stopwatch
    clearInterval(interval);
    interval = null;
    startPauseBtn.textContent = 'Resume';
    isRunning = false;
  }
};

resetBtn.onclick = () => {
  // Reset the stopwatch
  clearInterval(interval);
  interval = null;
  elapsed = 0;
  lapStart = 0;
  laps = [];
  display.textContent = "00:00:00.00";
  lapList.innerHTML = '';
  startPauseBtn.textContent = 'Start';
  isRunning = false;
};

lapBtn.onclick = () => {
  if (isRunning) {
    // Record the current lap time
    const lapTime = Date.now() - lapStart;
    laps.push(lapTime);
    lapStart = Date.now();
    updateLapTimes();
  }
};

function updateTime() {
  elapsed = Date.now() - startTime;
  let ms = Math.floor((elapsed % 1000) / 10);
  let s = Math.floor((elapsed / 1000) % 60);
  let m = Math.floor((elapsed / (1000 * 60)) % 60);
  let h = Math.floor((elapsed / (1000 * 60 * 60)));

  display.textContent =
    `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms)}`;
}

function updateLapTimes() {
  const lapTime = laps[laps.length - 1];
  let ms = Math.floor((lapTime % 1000) / 10);
  let s = Math.floor((lapTime / 1000) % 60);
  let m = Math.floor((lapTime / (1000 * 60)) % 60);
  let h = Math.floor((lapTime / (1000 * 60 * 60)));

  const lapDisplay = `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms)}`;

  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${laps.length}: ${lapDisplay}`;
  lapList.appendChild(lapItem);
}

function pad(n) {
  return n.toString().padStart(2, '0');
}
