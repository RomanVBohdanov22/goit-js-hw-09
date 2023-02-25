import { Notify } from 'notiflix/build/notiflix-notify-aio'; //npm i notiflix
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputLnk = document.querySelector('input#datetime-picker');
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
  onClose([selectedDates]) {// selectedDates[0]
      console.log(selectedDates); 
      const selectedTime = selectedDates.getTime();  // selectedDates[0]
      const currentTime = Date.now();
      const differTime = selectedTime - currentTime;
      if (differTime < 0) Notify.warning("Please choose a date in the future");
      else buttonStartLnk.removeAttribute('disabled');
  },
};

flatpickr(inputLnk, options);

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
    buttonStartLnk.setAttribute('disabled', true);
    timerId = setInterval(() => {
    hw9Timer((new Date(inputLnk.value.trim())).getTime());
  }, 1000);   

}

function addLeadingZero(value){ 
    return String(value).padStart(2, '0');   
}

function hw9Timer(targetMilliseconds) { 
    const diffTime = targetMilliseconds - (new Date()).getTime();
    if (diffTime < 0) {
        clearInterval(timerId);        
        return;
    }
    toDisplay(convertMs(diffTime));
}

function toDisplay(paramObj = {})
{
    spanDaysLnk.textContent = addLeadingZero(paramObj.days);
    spanHoursLnk.textContent = addLeadingZero(paramObj.hours);
    spanMinutesLnk.textContent = addLeadingZero(paramObj.minutes);
    spanSecondsLnk.textContent = addLeadingZero(paramObj.seconds);
}