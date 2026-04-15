'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const startButton = document.querySelector('button[data-start]');
const dateTimePickerElement = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

startButton.disabled = true;
startButton.addEventListener('click', handleStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const timeNow = Date.now();
    if (selectedDates[0].getTime() <= timeNow) {
      startButton.disabled = true;
      iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
        backgroundColor: 'pink',
        position: 'topLeft',
        timeout: 8000,
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

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

function handleStartClick() {
  let timeRemaining = userSelectedDate.getTime() - Date.now();
  startButton.disabled = true;
  dateTimePickerElement.disabled = true;
  const intervalId = setInterval(function () {
    if (timeRemaining <= 999) {
      clearInterval(intervalId);
      setTimeout(function () {
        dateTimePickerElement.disabled = false;
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
      }, 100);
    }
    const timeRemainingObject = convertMs(timeRemaining);
    daysElement.textContent = addLeadingZero(timeRemainingObject.days);
    hoursElement.textContent = addLeadingZero(timeRemainingObject.hours);
    minutesElement.textContent = addLeadingZero(timeRemainingObject.minutes);
    secondsElement.textContent = addLeadingZero(timeRemainingObject.seconds);
    timeRemaining = userSelectedDate.getTime() - Date.now();
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
