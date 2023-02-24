//import _ from 'lodash';

import { Notify } from 'notiflix/build/notiflix-notify-aio'; //npm i notiflix
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputLnk = document.querySelector('#datetime-picker');
const buttonStartLnk = document.querySelector('button[data-start]');
buttonStartLnk.setAttribute('disabled', true);
const spanDaysLnk = document.querySelector('.timer .value[data-days]');
const spanHoursLnk = document.querySelector('.timer .value[data-hours]');
const spanMinutesLnk = document.querySelector('.timer .value[data-minutes]');
const spanSecondsLnk = document.querySelector('.timer .value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedTime = selectedDates[0].getTime();
      console.log(selectedTime);
      const currentTime = (new Date()).getTime();
      const differTime = selectedTime - currentTime;
      if (differTime < 0) Notify.warning("Please choose a date in the future");
      else buttonStartLnk.removeAttribute('disabled');
  },
};

flatpickr("input#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


buttonStartLnk.addEventListener("click", onButtonStart);

let timerId = null;

function onButtonStart(e) { 
    
    let textDate = inputLnk.value.trim();
    console.log(textDate);
    timerId = setInterval(() => {
    hw9Timer((new Date(textDate)).getTime());
  }, 1000);   

}

function addLeadingZero(value){ 
    if (value.length >= 3) return value;
    return value.padStart(2, '0');   
}

function hw9Timer(targetMilliseconds) { 
    const diffTime = targetMilliseconds - (new Date()).getTime();
    const convertedTimeObj = convertMs(diffTime);

    if (diffTime < 0) {
        clearInterval(timerId);
        return;
    }

    spanDaysLnk.textContent = addLeadingZero(String(convertedTimeObj.days));
    spanHoursLnk.textContent = addLeadingZero(String(convertedTimeObj.hours));
    spanMinutesLnk.textContent = addLeadingZero(String(convertedTimeObj.minutes));
    spanSecondsLnk.textContent = addLeadingZero(String(convertedTimeObj.seconds));

}

function dumbTimer(startMilliseconds)
{ 
    const currentDate = new Date();

    const diffMilliseconds = (currentDate.getTime() - startMilliseconds);

    if (diffMilliseconds > 0) { clearInterval(timerId); }

    console.log("dt ", diffMilliseconds);

    const diffDate = new Date(Math.abs(diffMilliseconds));


    const dayOfMonth = diffDate.getDate() - 1;
   
    const hours = diffDate.getHours();
    const minutes = diffDate.getMinutes();
    const seconds = diffDate.getSeconds();
      
    spanDaysLnk.textContent = dayOfMonth;
    spanHoursLnk.textContent = hours;
    spanMinutesLnk.textContent = minutes;
    spanSecondsLnk.textContent = seconds;
}