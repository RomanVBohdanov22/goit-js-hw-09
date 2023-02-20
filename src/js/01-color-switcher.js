//console.log("task-01");
//alert("task-01");
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyLnk = document.querySelector('body');
const btnStartLnk = document.querySelector('button[data-start]');
const btnStopLnk = document.querySelector('button[data-stop]');
//const DEFAULT_COLOR = bodyLnk.style.backgroundColor;

let timerId = null;

btnStartLnk.addEventListener('click', onStartClick);
console.log(btnStartLnk.attributes);
function onStartClick(e) {
  btnStartLnk.setAttribute('disabled', true);
  btnStartLnk.removeEventListener('click', onStartClick);

  btnStopLnk.addEventListener('click', onStopClick);
  changeColorCycled();
}

function onStopClick(e) {
  btnStartLnk.removeAttribute('disabled');
  console.log(btnStartLnk.attributes);
  btnStartLnk.addEventListener('click', onStartClick);

  btnStopLnk.removeEventListener('click', onStopClick);
  clearInterval(timerId);

  //changeColor(DEFAULT_COLOR);
}

function changeColorCycled() {
  timerId = setInterval(() => {
    bodyLnk.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

/*
function changeColor(color) {
  bodyLnk.style.backgroundColor = color;
}
*/
