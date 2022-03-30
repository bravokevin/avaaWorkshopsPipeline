// main.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module 
 */

/**
 * 
 */
type WorkshopFinalData = {
  workshop: Workshop;
  formUrl: string;
  completeFormUrl: string;
}
/**
 * The column from where we set and grab the meeting url of a workshop
 */
const COLUMN_FOR_MEETING_URL = 'Q'


/**
 * Column of the main spreadsheet in where we set the meeting id 
 */
const COLUMN_FOR_MEETING_ID = 'R'

/**
 * Column in the main spreadsheet in where we set the meeting pasworkd, if so.
 */
const COLUMN_FOR_MEETING_PASSWORD = 'S'

/**
 * The column in where we set and get the workshop form url
 */
const COLUMN_FOR_FORM_URL = 'T'



/**
 * Sets all the meetings values asociated to an specific workhop in the main spreadsheet
 * 
 * @param rangeNumber the range of the especific workshop data row in a sheet
 * @param meetingUrl the meeting url 
 * @param meetingId the meeting Id
 * @param meetingPassword (optional) the meeting password
 */
const setValuesToSpreadsheet = (rangeNumber: number, formUrl: string, meetingUrl?: string, meetingId?: string, meetingPassword?: string) => {
  const rangeForMeetingUrl = `${COLUMN_FOR_MEETING_URL}${rangeNumber}`
  const cellForMeetingUrl = sheet.getRange(rangeForMeetingUrl)

  const rangeForMeetingId = `${COLUMN_FOR_MEETING_ID}${rangeNumber}`
  const cellForMeetingId = sheet.getRange(rangeForMeetingId)

  const rangeForMeetingPassword = `${COLUMN_FOR_MEETING_PASSWORD}${rangeNumber}`
  const cellForMeetingPassword = sheet.getRange(rangeForMeetingPassword)

  const rangeForFormUrl = `${COLUMN_FOR_FORM_URL}${rangeNumber}`
  const cellForFormUrl = sheet.getRange(rangeForFormUrl)

  cellForMeetingUrl.setValue(meetingUrl);
  cellForMeetingId.setValue(meetingId);
  cellForFormUrl.setValue(formUrl)
  cellForMeetingPassword.setValue(meetingPassword);

}

/**
 * Sets an event in the calendar and gets the meeting created for that event and the 'add to my calendar' link
 * 
 * @param workshop the data of a workshop
 * @returns the meeting link and the 'add to my calendar' link
 */
const calendarMain = (workshop: Workshop) => {
  const eventId = createEvent(workshop)
  if (workshop.kindOfWorkshop === "Presencial") {
    const addUrl = getPublicEventLink(workshop);
    return [addUrl]
  }
  else {
    const [meetLink, meetId] = getMeetEventLink(eventId!);
    const addUrl = getPublicEventLink(workshop, meetLink, meetId);
    return [addUrl, meetLink, meetId]
  }
}

const sendScheduledWorkshops = () => {
  const workshopsData = scriptProperties.getProperty(SCRIPT_PROPERTIES_WORKSHOPS_KEY)
  const allWorkshops = JSON.parse(workshopsData!)
}


/**
 * Gets and process all the data and send the emails 
 * 
 * @param subject the subject of the email
 * @param groupName the contact group name to which we want to send the email
 */
const main = (workshopsValuesArr: any[], subject: string, groupName: string) => {
  //getting all the necessarie values
  const processedWorkshopData = processData(workshopsValuesArr);
  // const [scheduledWOrkshops, workshopsToSendASAP] = processWorkshopType(processedWorkshopData);

  const workshopsToSendASAPFinalDataArr: WorkshopFinalData[] = []
  const scheduledWOrkshopsFinalArr = []

  //if there are workshops to schedule, store them in `Properties Services`
  // if (scheduledWOrkshops.length >= 1) {
  // }
  //if there are workshops to send ASAP
  // if (workshopsToSendASAP.length >= 1) {
  processedWorkshopData.forEach(w => {
    //@ts-ignore
    const workshopsToSendASAPFinalDataObj: WorkshopFinalData = {}
    if (w.kindOfWorkshop === "Presencial") {
      const [addUrl] = calendarMain(w)
      workshopsToSendASAPFinalDataObj.workshop = w;
      const [formUrl, completeFormUrl, submitTigger] = createForm(w, addUrl);
      workshopsToSendASAPFinalDataObj.formUrl = formUrl
      workshopsToSendASAPFinalDataObj.completeFormUrl = completeFormUrl
      setValuesToSpreadsheet(w.id, workshopsToSendASAPFinalDataObj.completeFormUrl);
    }
    else {
      const [addUrl, meetLink, meetId] = calendarMain(w);
      workshopsToSendASAPFinalDataObj.workshop = w;
      [workshopsToSendASAPFinalDataObj.formUrl, workshopsToSendASAPFinalDataObj.completeFormUrl] = createForm(w, addUrl);
      setValuesToSpreadsheet(w.id, workshopsToSendASAPFinalDataObj.completeFormUrl, meetLink, meetId, );
    }

    workshopsToSendASAPFinalDataArr.push(workshopsToSendASAPFinalDataObj)

  })
  sendEmails(workshopsToSendASAPFinalDataArr, subject, groupName);
  // }
  //update the range from where we grab the workshops data
  updateSheetRange()
}