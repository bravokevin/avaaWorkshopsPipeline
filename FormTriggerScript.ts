// FormTriggerScripts.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module 
 */
/**
 * The column in where we are going to update the number of registrants for workshop
 */
const COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS = 'O'

/**
 * The column from where we are going to grab the limit of participants of the workshop to set a limit of registries in the form
 */
const COLUMN_FOR_THE_LIMIT_DATA = 'J'

type EventFormResponse = {
  response: GoogleAppsScript.Forms.FormResponse;
  source: GoogleAppsScript.Forms.Form;
  triggerUid: GoogleAppsScript.Script.Trigger
}

type IndividualFormData = {
  workshopName: string;
  range: string;
  meetUrl: string;
  addToCalendarUrl: string;
  limit: number;
}

type RegistrantData = { name: string, email: string }

/**
 * Gets all the necesary data to configure the form 
 * 
 * Gets all the data stored during the form creation using {@linkcode copyForm} and the data to set the limits of the form responses and the meeting link of the form 
 * 
 * We achive this by using `range` and the diferent columns defined above ({@linkcode  COLUMN_FOR_MEETING_URL}, {@linkcode  COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS} & {@linkcode COLUMN_FOR_THE_LIMIT_DATA}) that is the range in the sheet in where the data about workshops is stored.
 * 
 * @param form the form from where we are going to grab the data 
 * @returns all the values grabbed
 */
const getInitValues = (form: GoogleAppsScript.Forms.Form) => {
  const rawMessage = form.getCustomClosedFormMessage().split('\-/');
  const workshopName = form.getTitle()
  const range = rawMessage[0];
  const addToCalendarUrl = rawMessage[1];
  const meetRange = COLUMN_FOR_MEETING_URL + range
  const limitRange = COLUMN_FOR_THE_LIMIT_DATA + range

  const meetUrl = sheet.getRange(meetRange).getValue()
  const limit = sheet.getRange(limitRange).getValue()

  const values: IndividualFormData = {
    workshopName,
    range,
    meetUrl,
    addToCalendarUrl,
    limit
  }
  return values;
}


/**
 * Stores all the necesary data to make the form works using  {@linkcode scriptProperties} under the id of the trigger created to that form using {@linkcode createTrigger}
 * 
 * @param data the data we want to store
 * @param key the key under we want to store the data (the trigger id)
 */
const storeFormData = (data: IndividualFormData, key: string) => {
  const jsonData = JSON.stringify(data)
  scriptProperties.setProperty(key, jsonData)

}

/**
 * Gets all the data stored under an specific {@linkcode scriptProperties} key 
 * 
 * @param key the {@linkcode scriptProperties} key from where we want to get the data 
 * @returns 
 */
const getFormIdividualData = (key: string): IndividualFormData => {
  const data = scriptProperties.getProperty(key);
  const formatedData: IndividualFormData = JSON.parse(data!)
  return formatedData

}

/**
 * Deletes an specific trigger based on its Id
 * 
 * @param triggerUid the id of the trigger we want to delete.
 * @see {@link https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_programmatically} for reference about deleting triggers
 */
const deleteTriger = (triggerUid: GoogleAppsScript.Script.Trigger) => {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getUniqueId() === triggerUid.toString()) {
      ScriptApp.deleteTrigger(triggerUid)
    }
  })
}


/**
 * Creates the confirmation message for every form sumbmition 
 * 
 * @param resp The data of the registry
 * @param workshopName the Name of the Workshop
 * @param meetUrl the meeting url 
 * @param addToCalendarUrl the "add to my calendar" link
 * @returns a confirmation message to send to all the people who registered in the form 
 */
const createEmailConfirmationMessage = (workshopName: string, meetUrl: string, addToCalendarUrl: string) => {
  let message;
  if (meetUrl == '') {
    message = `Hola!, Este correo confirma tu inscripcion a ${workshopName}.

Si gustas, puedes agregar este evento a tu calendario con este link ${addToCalendarUrl}
  `
  }
  else {
    message = `Hola!, Este correo confirma tu inscripcion a ${workshopName}

Este es el link de acceso a la reunion: ${meetUrl}

Si gustas, puedes agregar este evento a tu calendario con este link ${addToCalendarUrl}
  `
  }
  return message;
}

/**
 * Gets the name and the email of a registrant 
 * 
 * @param response the form response object of an entry
 * @returns the name and the email of a registrant
 */
const getResponse = (response: GoogleAppsScript.Forms.FormResponse) => {
  let resp: string[];
  const responses = response.getItemResponses();
  responses.forEach(r => {
    const itemName = r.getItem().getTitle();
    const itemResponse = r.getResponse();
    if (itemName === 'Correo electrónico') {
      //@ts-ignore
      resp.push(itemResponse);
    }
  })
  return resp;
}

/**
 * Deletes the form, the data stored in {@linkcode scriptProperties} of the form and the `onFormSubmit` trigger associated with that form
 * 
 * @param form the form class we want to close
 * @param triggerUid the trigger id of the `onFormSubmit `trigger to delete
 */
const closeForm = (form: GoogleAppsScript.Forms.Form, triggerUid: GoogleAppsScript.Script.Trigger) => {
  form.setCustomClosedFormMessage('Cupos agotados!');
  form.setAcceptingResponses(false);
  deleteTriger(triggerUid);
  scriptProperties.deleteProperty(triggerUid.toString());
  deleteFile(form.getId());
}


/**
 * Function that is fired whenever somoene submits a form response.
 * 
 * @param e the event object of the `onFormSubmit` event
 * @see {@link https://developers.google.com/apps-script/guides/triggers/events#form-submit_1} for reference about the event object
 */
const formSubmit = (e: EventFormResponse) => {

  const form = e.source;
  const numberOfResponses = form.getResponses().length;
  const triggerUid = e.triggerUid;
  const triggerUidString = triggerUid.toString();

  /**
 * This prevents collisions when multiple users are sending a form submision
 * @see {@link https://developers.google.com/apps-script/reference/lock/lock} For reference about look service.
 */
  const lock = LockService.getScriptLock();
  // Wait for up to 30 seconds for other processes to finish.
  lock.waitLock(30000);


  // with the first submision, gets all the values to make the form work.
  if (numberOfResponses < 2) {
    const values = getInitValues(form);
    storeFormData(values, triggerUidString);
  }

  const { workshopName, range, meetUrl, addToCalendarUrl, limit } = getFormIdividualData(triggerUidString);
  const resp = getResponse(e.response);

  //updates the value of the current number of registrants in the main spreadsheet.
  const cellForUpdate = COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS + range;
  sheet.getRange(cellForUpdate).setValue(numberOfResponses);
  
  SpreadsheetApp.flush()
  // release the lock
  lock.releaseLock();
  //sends the confirmation message for every registrant.
  const message = createEmailConfirmationMessage(workshopName, meetUrl, addToCalendarUrl);
  MailApp.sendEmail(resp.toString(), `Confirmacion de inscripcion a ${workshopName}`, message);

  //Close the form once the limit have been reached
  if (numberOfResponses >= limit) closeForm(form, triggerUid)
}