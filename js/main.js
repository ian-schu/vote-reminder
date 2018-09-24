let dateConfig = {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  enable: ['2018-10-22', '2018-10-23' ]
};

let timeConfig = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  minTime: '07:00',
  maxTime: '18:30',
};

flatpickr('#date-picker', dateConfig);
flatpickr('#time-picker', timeConfig);