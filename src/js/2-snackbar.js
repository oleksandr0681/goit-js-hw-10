'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = Number(event.target.elements.delay.value);
  let state;
  if (event.target.elements.state.value === 'fulfilled') {
    state = true;
  } else if (event.target.elements.state.value === 'rejected') {
    state = false;
  }
  console.log('delay: ', event.target.elements.delay);
  console.log(state);
  const promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      if (state === true) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.show({
        title: 'OK',
        message: `✅ Fulfilled promise in ${value}ms`,
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
        position: 'topLeft',
        timeout: 8000,
      });
    })
    .catch(error => {
      iziToast.show({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        timeout: 8000,
      });
    });
}
