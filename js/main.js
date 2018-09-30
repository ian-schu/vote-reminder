import flatpickr from "flatpickr";

let dateConfig = {
  altInput: true,
  altFormat: "M j, Y",
  dateFormat: "Y-m-d",
  enabled: ["2018-10-22","2018-10-23"],
  defaultDate: "2018-10-22",
};

let timeConfig = {
  noCalendar: true,
  enableTime: true,
  minuteIncrement: 5,
  dateFormat: "H:i",
  defaultDate: "10:30",
  minTime: "07:00",
  maxTime: "18:30",
};

const showForm = () => {
  startButton.style.display = "none";
  form.style.display = "block";
};

const validDate = date => {
  let selected = flatpickr.parseDate(date, "Y-m-d");
  let result = true;
  if (selected.getMonth() != 9) result = false;
  if (selected.getFullYear() != 2018) result = false;
  if (selected.getDate() > 23) result = false;
  if (selected.getDate() < 22) result = false;
  return result;
};

const validTime = time => {
  let selected = flatpickr.parseDate(time, "H:i");
  let result = true;
  if (selected.getHours() < 7) result = false;
  if (selected.getHours() > 18) result = false;
  return result;
};

const setFormError = (element, message) => {
  element.classList.add("error");
  errors.textContent = message;
  finishButton.disabled = true;
};

const clearFormError = (element) => {
  element.classList.remove("error");
  errors.textContent = "";
  finishButton.disabled = false;
};

const dateInput = document.getElementById("date-picker");
const timeInput = document.getElementById("time-picker");

const startButton = document.getElementById("startButton");
const finishButton = document.getElementById("finishButton");
const errors = document.getElementById("errors");
const form = document.getElementById("form");

const datePicker = flatpickr(dateInput, dateConfig);
const timePicker = flatpickr(timeInput, timeConfig);

const dateFlatpickr = document.querySelector(".flatpickr-input[type=\"date\"]");
const timeFlatpickr = document.querySelector(".flatpickr-input[type=\"time\"]");

startButton.addEventListener("click", showForm);
finishButton.addEventListener("click", () => addToCalendar());

dateInput.addEventListener("input", (e) => {
  if (!validDate(e.target.value)) {
    setFormError(dateFlatpickr, "Please choose either 10/22 or 10/23");
  } else {
    clearFormError(dateFlatpickr);
  }
});

timeInput.addEventListener("input", (e) => {
  if (!validTime(e.target.value)) {
    setFormError(timeFlatpickr, "Please choose a time between 7am and 6:30pm");
  } else {
    clearFormError(timeFlatpickr);
  }
});


// Calendar handlers
import ical from "ical-generator";
import moment from "moment";
import buildUrl from "build-url";
import {saveAs} from "file-saver/FileSaver";

const title = "Don't forget to vote!";
const eventLocation = "See description for link";
const details = `Thanks for setting a reminder! Congrats on being a part of the solution.

To find your voting location, go here:
https://teamrv-mvp.sos.texas.gov/MVP/mvp.do

This message brought to you by VoteReminder.us`;

const getCalendarSelection = () => {
  let radio = document.querySelector("input[name=\"calendar\"]:checked") || "";
  return radio ? radio.value : "";
};

const addToCalendar = () => {
  let calendarSelection = getCalendarSelection();
  let selectedDate = new Date(flatpickr.parseDate(`${dateInput.value} ${timeInput.value}`,"Y-m-d H:i"));

  if (calendarSelection === "ical") {
    let start = moment(selectedDate);
    let end = start.add(45,"minutes");

    let description = details.replace(/\n/g,"\n");
    let cal = ical({domain: "votereminder.us", name: "TX Midterm 2018"});

    cal.createEvent({
      start: start,
      end: end,
      timestamp: moment(),
      summary: title,
      organizer: {
        name: "VoteReminder.us",
        email: "citizen@votereminder.us"
      },
      description: description,
      location: eventLocation
    });

    console.log(cal.toString());

    // window.open( "data:text/calendar;charset=utf8,"+escape(cal.toString()));

    // let blob = new Blob([cal.toString()], {type: "text/calendar;charset=utf-8"});
    // let stamp = moment().format("M-D-hms");
    // saveAs(blob, `vote-reminder-${stamp}.ics`);

  } else if (calendarSelection === "google") {
    let googleStart = selectedDate.toISOString().replace(/-|:|\.\d\d\d/g,"");
    selectedDate.setHours(selectedDate.getHours()+1);
    let googleEnd = selectedDate.toISOString().replace(/-|:|\.\d\d\d/g,"");

    let destination = buildUrl("https://www.google.com",
      {
        path: "calendar/render",
        queryParams: {
          action: "TEMPLATE",
          text: title,
          details: details,
          location: eventLocation,
          dates: `${googleStart}/${googleEnd}`
        }
      }
    );
    location.assign(destination);
  } else if (calendarSelection === "yahoo") {
    console.log("Yahoo selected");
  } else {
    console.log("No calendar selected");
  }
};