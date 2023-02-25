import { result } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refsToForm = {
  form: document.querySelector('.form'),
  delay: document.querySelector('.form input[name="delay"]'),
  step: document.querySelector('.form input[name="step"]'),
  amount: document.querySelector('.form input[name="amount"]'),
  //button: document.querySelector('.form button'),
};

console.log(refsToForm);
refsToForm.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delay = 0;
  let step = 0;
  let amount = 0;

  if (
    (refsToForm.delay.value >= 0) &&
    (refsToForm.step.value >= 0) &&
    (refsToForm.amount.value >= 0)
  ) {
    delay = refsToForm.delay.value;
    step = refsToForm.step.value;
    amount = refsToForm.amount.value;
    console.log(`d= ${delay} , s= ${step} , a=${amount}`);
  } else Notify.failure('Make CORRECT choise, pls! (Must be >=0)');

  //const position = delay * amount + step;
  let position = 1;
  for (let i = amount; i > 0; i--) { 
  
  const promise = new Promise(createPromise(position, delay));
    delay += step;
    position += 1;
  promise.then(
    result => { console.log(result); },
    error => { console.log(error); },
  );

}
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`)// Fulfill
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)// Reject
  }
  }, delay)  
}

/*
createPromise(2, 1500)
  .then(({ position, delay }) => {
    //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });*/

/*
Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');
*/
