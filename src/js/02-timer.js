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
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


buttonStartLnk.addEventListener("click", onButtonStart);

let timerId = null;

function onButtonStart(e) {     
    timerId = setInterval(() => {
    hw9Timer((new Date(inputLnk.value.trim())).getTime());
  }, 1000);   

}

function addLeadingZero(value){ 
    value = String(value);
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

    spanDaysLnk.textContent = addLeadingZero(convertedTimeObj.days);
    spanHoursLnk.textContent = addLeadingZero(convertedTimeObj.hours);
    spanMinutesLnk.textContent = addLeadingZero(convertedTimeObj.minutes);
    spanSecondsLnk.textContent = addLeadingZero(convertedTimeObj.seconds);

}