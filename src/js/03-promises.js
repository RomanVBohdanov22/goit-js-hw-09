import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = +e.target.delay.value;
  let step = +e.target.step.value;
  let amount = +e.target.amount.value;

  if ([delay, step, amount].find(v => v < 0)) {
    Notify.failure('Make CORRECT choise, pls! (Must be >=0)');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({position, delay});
      } else {
        rej({position, delay});
      }
    }, delay);
  });
}
