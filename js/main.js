const inputs = {
  date: false,
  time: false,
  dateFormat: "MM/DD/YY",
  timeFormat: "H:mm A",
  fullDateTimeFormat: "MM/DD/YY H:mm A",
  fullDateTime: null
};


// #####################
// INIT DOM VARIABLES
// #####################
const getById = id => {
  return document.getElementById(id);
};

const dateInput = getById("date-input");
const timeInput = getById("time-input");

const bookTime = getById("bookTime");
const addToApple = getById("addToApple");
const addToGoogle = getById("addToGoogle");
const calendarFieldset = getById("calendar-fieldset");
const form = getById("form");
const thanks = getById("thanks");


// #####################
// UI UPDATES
// #####################
const showForm = () => {
  bookTime.style.display = "none";
  form.style.display = "block";
};

const showThanks = () => {
  thanks.style.display = "block";
};

const selectDateTime = (ev, key) => {
  inputs[key] = ev.target.value ? true : false;

  if (inputs.date && inputs.time) {
    inputs.fullDateTime = moment(`${dateInput.value} ${timeInput.value}`, 
      inputs.fullDateTimeFormat);
  } else {
    inputs.fullDateTime = null;
  }

  // console.log(inputs.fullDateTime);
  showHideButtons();
};

const showHideButtons = () => {
  if (inputs.date && inputs.time) {
    calendarFieldset.style.visibility = "visible";
  } else {
    calendarFieldset.style.visibility = "hidden";
  }
};

// ################
// ADD LISTENERS
// ################
bookTime.addEventListener("click", showForm);

dateInput.addEventListener("input", ev => selectDateTime(ev, "date"));
timeInput.addEventListener("input", ev => selectDateTime(ev, "time"));

addToGoogle.addEventListener("click", ev => {
  sendToGoogle(ev);
  showThanks();
});
addToApple.addEventListener("click", ev => {
  sendToApple(ev);
  showThanks();
});


// ################
// SEND TO CALENDAR HANDLERS
// ################
import ical from "ical-generator";
import moment from "moment";
import buildUrl from "build-url";

const title = "Voting time!";
const eventLocation = "See description for link";
const details = `Thanks for being a part of the solution!

To get all your specific, local details for voting, enter your personal info here:
https://teamrv-mvp.sos.texas.gov/MVP/mvp.do

Do you have family? Or friends? Great! Send them to www.votingplan.org and spread the civic love.`;

const sendToGoogle = ev => {
  ev.preventDefault();
  const googleStart = inputs.fullDateTime.toISOString().replace(/-|:|\.\d\d\d/g,"");
  const googleEnd = inputs.fullDateTime.clone().add(30, "minutes").toISOString().replace(/-|:|\.\d\d\d/g,"");

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

  window.open(destination,"_blank");
};

const sendToApple = ev => {
  ev.preventDefault();
  let start = inputs.fullDateTime
  let end = inputs.fullDateTime.clone().add(30,"minutes");

  let description = details.replace(/\n/g,"\n");
  let cal = ical({domain: "votingplan.org", name: "TX Midterm 2018"});

  cal.createEvent({
    start: start,
    end: end,
    timestamp: moment(),
    summary: title,
    organizer: {
      name: "VotingPlan.org",
      email: "citizen@votingplan.org"
    },
    description: description,
    location: eventLocation
  });

  let eventFile = new Blob([cal.toString()], {type:"text/calendar"});
  let eventLink = URL.createObjectURL(eventFile);
  location.assign(eventLink);
};
