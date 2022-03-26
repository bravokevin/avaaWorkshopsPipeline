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
 * Sets all the meetings values asociated to an specific workhop in the main spreadsheet
 * 
 * @param rangeNumber the range of the especific workshop data row in a sheet
 * @param meetingUrl the meeting url 
 * @param meetingId the meeting Id
 * @param meetingPassword (optional) the meeting password
 */
const setMeeetingValues = (rangeNumber: number, meetingUrl: string, meetingId: string, meetingPassword?: string) => {
  const rangeForMeetingUrl = `${COLUMN_FOR_MEETING_URL}${rangeNumber}`
  const cellForMeetingUrl = sheet.getRange(rangeForMeetingUrl)

  const rangeForMeetingId = `${COLUMN_FOR_MEETING_ID}${rangeNumber}`
  const cellForMeetingId = sheet.getRange(rangeForMeetingId)

  const rangeForMeetingPassword = `${COLUMN_FOR_MEETING_PASSWORD}${rangeNumber}`
  const cellForMeetingPassword = sheet.getRange(rangeForMeetingPassword)

  cellForMeetingUrl.setValue(meetingUrl);
  cellForMeetingId.setValue(meetingId);
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
  const [meetLink, meetId] = getMeetEventLink(eventId!);
  const addUrl = getPublicEventLink(workshop, meetLink, meetId);
  return [meetLink, addUrl, meetId]
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
  const [scheduledWOrkshops, workshopsToSendASAP] = processWorkshopType(processedWorkshopData);

  const workshopsToSendASAPFinalDataArr: WorkshopFinalData[] = []
  const scheduledWOrkshopsFinalArr = []

  //if there are workshops to schedule, store them in `Properties Services`
  if (scheduledWOrkshops.length >= 1) {
  }
  //if there are workshops to send ASAP
  if (workshopsToSendASAP.length >= 1) {
    workshopsToSendASAP.forEach(w => {
      //@ts-ignore
      const workshopsToSendASAPFinalDataObj: WorkshopFinalData = {}
      const [meetLink, addUrl, meetId] = calendarMain(w);
      setMeeetingValues(w.id, meetLink, meetId);
      workshopsToSendASAPFinalDataObj.workshop = w;
      [workshopsToSendASAPFinalDataObj.formUrl, workshopsToSendASAPFinalDataObj.completeFormUrl] = createForm(w, addUrl);
      workshopsToSendASAPFinalDataArr.push(workshopsToSendASAPFinalDataObj)

    })
    sendEmails(workshopsToSendASAPFinalDataArr, subject, groupName);
  }
  //update the range from where we grab the workshops data
  updateSheetRange()
}