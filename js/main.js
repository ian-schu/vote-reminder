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

const dateInput = document.getElementById('date-picker');
const datePicker = flatpickr(dateInput, dateConfig);
const timeInput = document.getElementById('time-picker');
const timePicker = flatpickr(timeInput, timeConfig);