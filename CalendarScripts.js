// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
// --------------------------------------------------- Calendar Utils Functions ---------------------------------------------------
/**
 * Creates the event object with all the details about the workshop
 *
 * it evaluates whether the workshop is "Presencial" or "Virtual" to set up the virtual meeting or not
 *
 * If the platform of the workshop is 'Google Meet', it creates a meet meeting and add it to the event
 *
 * @param name - The name of the workshop
 * @param kindOfWorkshop
 * @param platform - platform of the workshop
 * @param calendarDescription - decsription with all the details of the workshop
 * @param start - the start hour of the workshop
 * @param end - the end hour of the workshop
 * @returns an event object
 *
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events} for the event schema
 */
const createEventObject = (name, kindOfWorkshop, platform, calendarDescription, start, end, zoomUrl) => {
  let event;
  if (kindOfWorkshop === "Presencial") {
    event = {
      summary: name,
      description: calendarDescription,
      location: platform,
      start: {
        dateTime: start
      },
      end: {
        dateTime: end
      },
      visibility: "public",
      guestsCanSeeOtherGuests: false,
      //sets a reminder 3 hours before the event 
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "popup",
            minutes: 120
          }
        ]
      },
    };
  }
  else {
    switch (platform) {
      case 'Google Meet':
        event = {
          summary: name,
          description: calendarDescription,
          start: {
            dateTime: start
          },
          end: {
            dateTime: end
          },
          visibility: "public",
          // Creates a google meet meeting 
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet"
              },
              requestId: "7qxalsvy0e",
            },
          },
          guestsCanSeeOtherGuests: false,
          //sets reminders 30 and 5 minutes before the event
          reminders: {
            useDefault: false,
            overrides: [
              {
                method: "popup",
                minutes: 30
              },
              {
                method: "popup",
                minutes: 5
              }
            ]
          },
        };
        break;
      case 'Zoom':
        event = {
          summary: name,
          description: calendarDescription,
          location: zoomUrl,
          start: {
            dateTime: start
          },
          end: {
            dateTime: end
          },
          visibility: "public",
          // Creates a google meet meeting 
          guestsCanSeeOtherGuests: false,
          //sets reminders 30 and 5 minutes before the event
          reminders: {
            useDefault: false,
            overrides: [
              {
                method: "popup",
                minutes: 30
              },
              {
                method: "popup",
                minutes: 5
              }
            ]
          },
        };
        break;
      case 'Otra':
        event = {
          summary: name,
          description: calendarDescription,
          start: {
            dateTime: start
          },
          end: {
            dateTime: end
          },
          visibility: "public",
          // Creates a google meet meeting 
          guestsCanSeeOtherGuests: false,
          //sets reminders 30 and 5 minutes before the event
          reminders: {
            useDefault: false,
            overrides: [
              {
                method: "popup",
                minutes: 30
              },
              {
                method: "popup",
                minutes: 5
              }
            ]
          },
        };
        break;
      case 'Paddlet':
        event = {
          summary: name,
          description: calendarDescription,
          start: {
            date: '2023-02-16'
          },
          end: {
            date: '2023-02-19'
          },
          visibility: "public",
          // Creates a google meet meeting 
          guestsCanSeeOtherGuests: false,
          //sets reminders 30 and 5 minutes before the event
          reminders: {
            useDefault: false,
            overrides: [
              {
                method: "popup",
                minutes: 30
              },
              {
                method: "popup",
                minutes: 5
              }
            ]
          },
        };
        break;
    }
  }
  return event;
};
/**
 * Evaluates wheter the calendar under the id {@linkcode CALENDAR_ID} exist or not. If exist returns that id, if not, returns the id of the users default calendar.
 *
 * @returns the deafults calendar id or {@linkcode CALENDAR_ID}
 */
const getCalendarId = () => {
  let calendarId = '';
  if (CalendarApp.getCalendarById(CALENDAR_ID) === null) {
    calendarId = CalendarApp.getDefaultCalendar().getId();
  }
  else {
    calendarId = CALENDAR_ID;
  }
  return calendarId;
};

const quite = (str) => {
  const withNoPoint = str.replace(/\./g, "")
  return withNoPoint.replace(/\s/g, '')
}

function subtractHours(date, hours) {
  date.setHours(date.getHours() - hours);
  return date;
}

/**
 * formats the string passes as arguments to a date obj
 *
 * @param date the date of the event
 * @param startingHour the start hour of the event
 * @param endHour the end hour of the event
 * @returns the date object of the start and end hour in ISO string format
 */
const getFormatedDate = (date, startingHour, endHour) => {
  const start = new Date(date + "," + quite(startingHour))
  const end = new Date(date + "," + quite(endHour));
  // subtraemos una hora para que el iosstring este acorde con la hora del taller
  // ver https://stackoverflow.com/questions/29477072/why-does-new-date-differs-1-hour-from-new-date-toisostring
  // subtractHours(start, 1)
  // subtractHours(end, 1)
  return [start.toISOString(), end.toISOString()];
};
/**
 * Creates the description for the calendar event
 *
 * @param pensum - the area in where the event goes in terms of the Pensum of AVAA
 * @param speaker - the speaker of the event
 * @param kindOfWorkshop
 * @param platform - platform in where the event is going to happen
 * @param description - The description of the event
 * @returns a string with all the information about the event
 */
const createCalendarDescription = (pensum, speaker, kindOfWorkshop, platform, description, meetingLink, meetingId, meetingPassword) => {
  let calendarDescription = ''
  switch (kindOfWorkshop) {
    case "Presencial":
      calendarDescription = `<b>Competencia Asociada:</b> ${pensum} 
<b>Facilitador:</b> ${speaker} 
<b>Modalidad:</b> ${kindOfWorkshop}
<b>Lugar:</b> ${platform}

${description}`
      break

    case "Virtual":

      calendarDescription = `<b>Competencia Asociada:</b> ${pensum} 
<b>Facilitador:</b> ${speaker} 
<b>Modalidad:</b> ${kindOfWorkshop}
<b>Plataforma:</b> ${platform}
<b>Link de la reunion:</b> ${meetingLink}
<b>Id de la reunion:</b> ${meetingId}
${platform === 'Zoom' ? `<b>Contraseña de la reunion:</b> ${meetingPassword}` : ''}

${description}`
      break

    case "Asincrono":
      calendarDescription = `<b>Competencia Asociada:</b> ${pensum} 
<b>Facilitador:</b> ${speaker} 
<b>Modalidad:</b> ${kindOfWorkshop}
<b>Plataforma:</b> ${platform}

Recuerda que tienes solo tienes 3 dias para completar los contenidos del taller. 

${description}`
      break;

  }
  return calendarDescription;
};
// --------------------------------------------------- Calendar Main function ---------------------------------------------------
/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 *
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id
 */
const createEvent = (values) => {
  //handler the case in where the calendar dosnt exist
  const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour } = values;
  const calendarId = getCalendarId();
  const [start, end] = getFormatedDate(date, startHour, endHour);
  let calendarDescription;
  let eventDetails;
  if (kindOfWorkshop === "Presencial") {
    calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
    eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
    // creates the event
    const event = Calendar.Events.insert(eventDetails, calendarId, {
      conferenceDataVersion: 1,
    });
    return "NONE";
  }
  else {
    if (platform === 'Zoom') {
      const [join_url, id, password] = createZoomMeeting(name, start);
      calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, join_url, id, password);
      eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end, join_url);
      // creates the event
      const event = Calendar.Events.insert(eventDetails, calendarId, {
        conferenceDataVersion: 1,
      });
      return [event.id, join_url, id, password];
    }
    else if (platform === 'Google Meet') {
      calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
      eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
      // creates the event
      const event = Calendar.Events.insert(eventDetails, calendarId, {
        conferenceDataVersion: 1,
      });
      return event.id.toString();
    }
    else if (platform === 'Paddlet') {
      calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
      eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
      // creates the event
      const event = Calendar.Events.insert(eventDetails, calendarId, {
        conferenceDataVersion: 1,
      });
      return "NONE";
    }
  }
};
// --------------------------------------------------- Function Related to Google Meet Meeting ---------------------------------------------------
/**
 * gets the meet meeting link of an specific event
 *
 * @param eventId the id of the event we want get the meet meeting
 * @returns the meet link and its id
 */
const getMeetEventLink = (eventId) => {
  const calendarId = getCalendarId();
  const event = Calendar.Events.get(calendarId, eventId);
  const meetLink = event.hangoutLink;
  const index = meetLink.lastIndexOf('/');
  const meetId = meetLink.slice(index + 1);
  return [meetLink, meetId];
};
// --------------------------------------------------- Function Related to "Add to my calendar" link ---------------------------------------------------
/**
 * It creates an 'Add to my calendar' Link so all the registrant can add the specific event for a workshops to its calendar
 *
 * @see {link https://stackoverflow.com/questions/5831877/how-do-i-create-a-link-to-add-an-entry-to-a-calendar} for more information about how to create the link
 * @param workshop the details of a workshop
 * @param meetingLink the meeting link
 * @param meetingId the meeting id
 * @returns an 'Add to my calendar' link
 */
const getPublicEventLink = (workshop, meetingLink, meetingId, meetingPasword) => {
  const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour} = workshop;
  const location = meetingLink ? meetingLink : platform;
  const calendarName = encodeURIComponent(name);
  const NDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, meetingLink, meetingId, meetingPasword);
  const [startDate, endDate] = getFormatedDate(date, startHour, endHour);
  const encodedLocation = encodeURIComponent(location);
  const encodeDescription = encodeURIComponent(NDescription);
  const calendarStartDate = startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '');
  const calendarEndDate = endDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '');
  let addUrl = '';
  if (kindOfWorkshop === "Asincrono") {
    const startDay = startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '').slice(0, -11);
    const endDayISO = addDays(endDate, 3)
    const endDay = endDayISO.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '').slice(0, -11)
    addUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${calendarName}&dates=${startDay}/${endDay}&details=${encodeDescription}&location=${encodedLocation}`;
  }
  else {
    addUrl = `http://www.google.com/calendar/event?action=TEMPLATE&text=${calendarName}&dates=${calendarStartDate}/${calendarEndDate}&details=${encodeDescription}&location=${encodedLocation}`;
  }
  return shortenLink(addUrl);
};


/** 
 * Generates a short url link by using the firebase Dynamic links API
 * 
 * @see {link https://firebase.google.com/docs/dynamic-links/rest} for details
 * 
 * It uses the rest API of firebase dynamic links to create a shortn link
 * 
 * @param link the link we want to shorten
 * @returns the shortened link
 * */
const shortenLink = (link) => {
  const webApiKey = "AIzaSyCVuL5MWV3CXIyM7C-M8fmEqygCXGFLC38";
  const data = {
    dynamicLinkInfo: {
      domainUriPrefix: 'https://proexcelencia.page.link',
      link: link
    },
    suffix: {
      option: 'SHORT'
    }
  }
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  }
  const response = UrlFetchApp.fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${webApiKey}`, options);
  return JSON.parse(response).shortLink;

}


const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString();
}