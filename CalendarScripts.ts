// --------------------------------------------------- Calendar Utils Functions ---------------------------------------------------

/**
 * Creates the event object with all the details about the workshop
 * 
 * it evaluates whether the workshop is "Presencial" or "Virtual" to set up the platform or not 
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
const createEventObject = (name: string, kindOfWorkshop: KindOfWorkshop, platform: Platform, calendarDescription: string, start: string, end: string): GoogleAppsScript.Calendar.Schema.Event => {

  let event;

  if (kindOfWorkshop === "Presencial") {
    event = {
      summary: name,
      description: calendarDescription,
      location: 'Oficinas de AVAA',
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
        }
        break;
      // case 'Zoom':
      //   break
      // case 'Otra':
      //   break
    }
  }
  //@ts-ignore
  return event;
}

/**
 * formats the string passes as arguments to a date obj
 * 
 * @param date the date of the event
 * @param startingHour the start hour of the event
 * @param endHour the end hour of the event 
 * @returns the date object of the start and end hour in ISO string format
 */
const getFormatedDate = (date: string, startingHour: string, endHour: string): string[] => {
  const start = new Date(date + "," + startingHour)
  const end = new Date(date + "," + endHour)
  return [start.toISOString(), end.toISOString()]

}

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
const createCalendarDescription = (
  pensum: Pensum,
  speaker: string,
  kindOfWorkshop: KindOfWorkshop,
  platform: Platform,
  description: string,
  meetingLink?: string, 
  meetingId?: string,
  meetingPassword?:string
): string => {

  const calendarDescription = `
Competencia Asociada: ${pensum} 
Facilitador: ${speaker} 
Modalidad: ${kindOfWorkshop}
${kindOfWorkshop === "Presencial" ? '' : 
`Plataforma: ${platform}
Link de la reunion: ${meetingLink}
Id de la reunion: ${meetingId}
${platform === 'Zoom'? `Contraseña de la reunion: ${meetingPassword}`: '' }` 
}

  ${description}
`
  return calendarDescription;
}

// --------------------------------------------------- Calendar Main function ---------------------------------------------------

/**
 * creates an event with the Workshops values passed as parameter using the google calendar API v3
 * 
 * @param values the information about the workshop
 * @see {@link https://developers.google.com/calendar/api/v3/reference/events/insert} for reference about the {insert} method
 * @returns the event id 
 */
const createEvent = (values: Workshop) => {
  const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour } = values;

  const [start, end] = getFormatedDate(date, startHour, endHour);
  const calendarDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description);
  const eventDetails = createEventObject(name, kindOfWorkshop, platform, calendarDescription, start, end);
  // creates the event
  const event = Calendar.Events!.insert(eventDetails, CALENDAR_ID, {
    conferenceDataVersion: 1,
  });

  return event.id;
}

// --------------------------------------------------- Function Related to Google Meet Meeting ---------------------------------------------------

/**
 * gets the meet meeting link of an specific event 
 * 
 * @param eventId the id of the event we want get the meet meeting
 * @returns the meet link and its id
 */
const getMeetEventLink = (eventId: string): string[] => {
  const event = Calendar.Events!.get(CALENDAR_ID, eventId);
  const meetLink = event.hangoutLink;
  const index = meetLink!.lastIndexOf('/')
  const meetId = meetLink!.slice(index + 1)
  return [meetLink!, meetId];
}

// --------------------------------------------------- Function Related to "Add to my calendar" link ---------------------------------------------------

/**
 * 
 * @param workshop 
 * @param meetingLink the url of the meeting 
 * @param meetingId 
 * @returns 
 */
const getPublicEventLink = (workshop: Workshop, meetingLink?: string, meetingId?: string) => {

  const { name, description, speaker, pensum, kindOfWorkshop, platform, date, startHour, endHour } = workshop;
  const location = meetingLink ? meetingLink : 'Oficinas de AAVA'
  const calendarName = encodeURIComponent(name)
  const NDescription = createCalendarDescription(pensum, speaker, kindOfWorkshop, platform, description, meetingLink, meetingId)

  const [startDate, endDate] = getFormatedDate(date, startHour, endHour)
  const EncodeDescription = encodeURIComponent(NDescription)
  const calendarStartDate = startDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')
  const calendarEndDate = endDate.replaceAll('-', '').replaceAll(':', '').replaceAll('.', '')

  // titulo, descripcion, fecha, 
  const addUrl = `https://calendar.google.com/calendar/r/eventedit?text=${calendarName}&dates=${calendarStartDate}/${calendarEndDate}&details=${EncodeDescription}&location=${location}`

  return addUrl
}
