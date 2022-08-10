import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const inputArea = document.querySelector('input');
const messageArea = document.querySelector('textarea');

const localStorageCloud = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(() => {
    const fieldsAreas = {
      email: inputArea.value,
      messageArea: messageArea.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(fieldsAreas));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({ email: inputArea.value, message: messageArea.value });
  form.reset();
  localStorage.removeItem(localStorageCloud);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageBank = load(localStorageCloud);
if (storageBank) {
  inputArea.value = storageBank.email;
  messageArea.value = storageBank.messageArea;
}
