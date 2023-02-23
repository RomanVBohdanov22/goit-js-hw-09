//import _ from 'lodash';

const inputLnk = document.querySelector('#datetime-picker');
const buttonStartLnk = document.querySelector('button[data-start]');

const spanDaysLnk = document.querySelector('.timer .value[data-days]');
const spanHoursLnk = document.querySelector('.timer .value[data-hours]');
const spanMinutesLnk = document.querySelector('.timer .value[data-minutes]');
const spanSecondsLnk = document.querySelector('.timer .value[data-seconds]');

buttonStartLnk.addEventListener("click", onButtonStart);

function onButtonStart(e) { 
    let textDate = inputLnk.value.trim();
    console.log(textDate);

    const date = new Date(textDate);
    const currentDate = new Date();
    const startMilliseconds = date.getTime();
    const currentMillisexonds = currentDate.getTime();
    
    const diffMilliseconds = Math.abs(currentMillisexonds - startMilliseconds);
    console.log("dt ", diffMilliseconds);
    const diffDate = new Date(diffMilliseconds);
    

    //console.log(diffDate);
   // console.log(date.getFullYear());
   // console.log(currentDate.getFullYear());
}

/*
    <input type="text" id="datetime-picker" />
    <button type="button" data-start>Start</button>

    <div class="timer">
      <div class="field">
        <span class="value" data-days>00</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>00</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>00</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>00</span>
        <span class="label">Seconds</span>
      </div>
    </div>
*/
