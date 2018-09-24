const defaultSelection = new Date('October 22, 2018');

let dateConfig = {
  altInput: true,
  altFormat: 'M j, Y',
  dateFormat: 'Y-m-d',
  enabled: ['2018-10-22','2018-10-23'],
  defaultDate: '2018-10-22',
};

let timeConfig = {
  noCalendar: true,
  enableTime: true,
  minuteIncrement: 5,
  dateFormat: 'H:i',
  defaultDate: '10:30',
  minTime: '07:00',
  maxTime: '18:30',
};

const showForm = () => {
  startButton.style.display = 'none';
  form.style.display = 'block';
};

const validDate = date => {
  let selected = flatpickr.parseDate(date, 'Y-m-d');
  let result = true;
  if (selected.getMonth() != 9) result = false;
  if (selected.getFullYear() != 2018) result = false;
  if (selected.getDate() > 23) result = false;
  if (selected.getDate() < 22) result = false;
  return result;
};

const validTime = time => {
  let selected = flatpickr.parseDate(time, 'H:i');
  console.log(selected);
  let result = true;
  if (selected.getHours() < 7) result = false;
  if (selected.getHours() > 18) result = false;
  return result;
};

const setFormError = (element, message) => {
  element.classList.add('error');
  errors.textContent = message;
  finishButton.disabled = true;
};

const clearFormError = (element) => {
  element.classList.remove('error');
  errors.textContent = "";
  finishButton.disabled = false;
};

const dateInput = document.getElementById('date-picker');
const timeInput = document.getElementById('time-picker');

const startButton = document.getElementById('startButton');
const finishButton = document.getElementById('finishButton');
const errors = document.getElementById('errors');
const form = document.getElementById('form');

const datePicker = flatpickr(dateInput, dateConfig);
const timePicker = flatpickr(timeInput, timeConfig);

dateInput.addEventListener('input', (e) => {
  if (!validDate(e.target.value)) {
    setFormError(dateFlatpickr, 'Please choose either 10/22 or 10/23');
  } else {
    clearFormError(dateFlatpickr);
  }
});

timeInput.addEventListener('input', (e) => {
  if (!validTime(e.target.value)) {
    setFormError(timeFlatpickr, 'Please choose a time between 7am and 6:30pm');
  } else {
    clearFormError(timeFlatpickr);
  }
});

let dateFlatpickr = document.querySelector('.flatpickr-input[type="date"]');
let timeFlatpickr = document.querySelector('.flatpickr-input[type="time"]');