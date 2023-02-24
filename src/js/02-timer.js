//import _ from 'lodash';

import { Notify } from 'notiflix/build/notiflix-notify-aio'; //npm i notiflix
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputLnk = document.querySelector('#datetime-picker');
const buttonStartLnk = document.querySelector('button[data-start]');

const spanDaysLnk = document.querySelector('.timer .value[data-days]');
const spanHoursLnk = document.querySelector('.timer .value[data-hours]');
const spanMinutesLnk = document.querySelector('.timer .value[data-minutes]');
const spanSecondsLnk = document.querySelector('.timer .value[data-seconds]');

buttonStartLnk.addEventListener("click", onButtonStart);

let timerId = null;

function onButtonStart(e) { 
    
    let textDate = inputLnk.value.trim();
    console.log(textDate);
    //const date = new Date(textDate);
    

    timerId = setInterval(() => {
    dumbTimer((new Date(textDate)).getTime());
  }, 1000);   

}

function dumbTimer(startMilliseconds)
{ 
    const currentDate = new Date();
    //const currentMillisexonds = currentDate.getTime();
    //const startMilliseconds = startDate.getTime();
    const diffMilliseconds = (currentDate.getTime() - startMilliseconds);

    if (diffMilliseconds > 0) { clearInterval(timerId); }

    console.log("dt ", diffMilliseconds);

    const diffDate = new Date(Math.abs(diffMilliseconds));

    //const year = Math.abs(diffDate.getFullYear() - 1970);
    //const month = diffDate.getMonth();

    const dayOfMonth = diffDate.getDate() - 1;
   
    const hours = diffDate.getHours();
    const minutes = diffDate.getMinutes();
    const seconds = diffDate.getSeconds();
      
    spanDaysLnk.textContent = dayOfMonth;
    spanHoursLnk.textContent = hours;
    spanMinutesLnk.textContent = minutes;
    spanSecondsLnk.textContent = seconds;
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
