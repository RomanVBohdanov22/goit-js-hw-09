function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyLnk = document.querySelector('body');
const btnStartLnk = document.querySelector('button[data-start]');
const btnStopLnk = document.querySelector('button[data-stop]');

let timerId = null;

btnStartLnk.addEventListener('click', onStartClick);
console.log(btnStartLnk.attributes);
function onStartClick(e) {
  btnStartLnk.setAttribute('disabled', true);
  startBtnEventOffStopBtnEventOn();
  changeColorCycled();
}

function onStopClick(e) {
  btnStartLnk.removeAttribute('disabled');
  console.log(btnStartLnk.attributes);
  stopBtnEventOffStartBtnEventOn();

  clearInterval(timerId);
}

function changeColorCycled() {
  timerId = setInterval(() => {
    bodyLnk.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function startBtnEventOffStopBtnEventOn() {
  btnStartLnk.removeEventListener('click', onStartClick);

  btnStopLnk.addEventListener('click', onStopClick);
}

function stopBtnEventOffStartBtnEventOn() {
  btnStartLnk.addEventListener('click', onStartClick);

  btnStopLnk.removeEventListener('click', onStopClick);
}
