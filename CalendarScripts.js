const CALENDAR_ID = "qe67k7alpo1k49njnnl0lt83qs@group.calendar.google.com"

/**
 * Creates the event data object to get passed into the event details creation. Based if the event is "Presencial" or not to create the specific meetin event in Google meet or Zoom
 */

const createEventObject = (name, kindOfWorkshop, platform, calendarDescription, start, end) => {
  let event;
  if (kindOfWorkshop === "Presencial") {
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
      guestsCanSeeOtherGuests: false,
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "popup",
            minutes: 120
          }
        ]
      },
    }
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
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet"
              },
              requestId: "7qxalsvy0e",
            },
          },
          guestsCanSeeOtherGuests: false,
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
        }
        break;
      case 'Zoom':
        break
      case 'Otro':
        break
    }
  }
  return event;
}

const getFormatedDate = (date, startingHour, endHour) => {
  const start = new Date(date + "," + startingHour)
  const end = new Date(date + "," + endHour)
  return [start.toISOString(), end.toISOString()]

}

const getMeetEventLink = (eventId) => {
  const event = Calendar.Events.get(CALENDAR_ID, eventId)
  const meetLink = event.hangoutLink
  return meetLink
}

const getPublicEventLink = (eventId) => {
  const event = Calendar.Events.get(CALENDAR_ID, eventId);
  const htmlLink = event.htmlLink
  const identificatorIndex = htmlLink.indexOf('=')
  const identificator = htmlLink.slice(identificatorIndex + 1)
  const addUrl = `https://calendar.google.com/event?action=TEMPLATE&tmeid=${identificator}&tmsrc=qe67k7alpo1k49njnnl0lt83qs%40group.calendar.google.com`
  return addUrl
}
// el url de agregar al evento, el url del google meet 

const processEventData = (...values) => {
  const eventDetails = [];
  values.forEach(value => {
    eventDetails.push({ ...values })
  })
  return eventDetails;
}


/**
 * Creates an event in the especified calendar
 */
const createEvent = (values) => {
  const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour } = values
  const [start, end] = getFormatedDate(date, startHour, endHour)

  const calendarDescription = `
  Competencia: ${pensum} 
  Facilitador: ${speaker} 
  Modalidad: ${kindOfWorkshop}
  ${kindOfWorkshop === "Presencial" ? '' : `Plataforma: ${platform}`}
  

  ${description}
`
  const eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
  const event = Calendar.Events.insert(eventDetails, CALENDAR_ID, {
    conferenceDataVersion: 1,
  });
  return event.id;
}
