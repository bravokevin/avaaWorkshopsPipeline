// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
// FormTriggerScripts.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module
 */
/**
 * The column in where we are going to update the number of registrants for workshop
 */
const COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS = 'O';
/**
 * The column from where we are going to grab the limit of participants of the workshop to set a limit of registries in the form
 */
const COLUMN_FOR_THE_LIMIT_DATA = 'J';
class Registrantresponse {
  constructor(_surnames, _names, _dni, _sex, _date, _phoneNumber, _email) {
    this.surnames = _surnames;
    this.names = _names;
    this.dni = _dni;
    this.sex = _sex;
    this.date = _date;
    this.phoneNumber = _phoneNumber;
    this.email = _email;
  }
}
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
const getInitValues = (form) => {
  const rawMessage = form.getCustomClosedFormMessage().split('\-/');
  const workshopName = form.getTitle();
  const range = rawMessage[0];
  const addToCalendarUrl = rawMessage[1];
  const submitTriggerId = rawMessage[2];
  const meetRange = COLUMN_FOR_MEETING_URL + range;
  const limitRange = COLUMN_FOR_THE_LIMIT_DATA + range;
  const meetUrl = sheet.getRange(meetRange).getValue();
  const limit = sheet.getRange(limitRange).getValue();
  const unfull = false;
  const { uncompleteTrigger, submitTrigger, end, formId } = getFormIdividualData(submitTriggerId);
  const values = {
    workshopName,
    range,
    meetUrl,
    addToCalendarUrl,
    limit,
    unfull,
    uncompleteTrigger,
    submitTrigger,
    end,
    formId
  };
  return values;
};
/**
 * Stores all the necesary data to make the form works using  {@linkcode scriptProperties} under the id of the trigger created to that form using {@linkcode createTrigger}
 *
 * @param data the data we want to store
 * @param key the key under we want to store the data (the trigger id)
 */
const storeFormData = (data, key) => {
  const jsonData = JSON.stringify(data);
  scriptProperties.setProperty(key, jsonData);
};
/**
 * Gets all the data stored under an specific {@linkcode scriptProperties} key
 *
 * @param key the {@linkcode scriptProperties} key from where we want to get the data
 * @returns
 */
const getFormIdividualData = (key) => {
  const data = scriptProperties.getProperty(key);
  const formatedData = JSON.parse(data);
  return formatedData;
};
/**
 * Deletes an specific trigger based on its Id
 *
 * @param triggerUid the id of the trigger we want to delete.
 * @see {@link https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_programmatically} for reference about deleting triggers
 */
const deleteTriger = (triggerUid) => {
  const allTriggers = ScriptApp.getProjectTriggers();
  for (let index = 0; index < allTriggers.length; index++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[index].getUniqueId() === triggerUid) {
      ScriptApp.deleteTrigger(allTriggers[index]);
      break;
    }
  }
};
/**
 * Creates the confirmation message for every form sumbmition
 *
 * @param resp The data of the registry
 * @param workshopName the Name of the Workshop
 * @param meetUrl the meeting url
 * @param addToCalendarUrl the "add to my calendar" link
 * @returns a confirmation message to send to all the people who registered in the form
 */
const createEmailConfirmationMessage = (workshopName, meetUrl, addToCalendarUrl, sheetUrl, scholarDNI, sheetName, limit, formLInk, scholarName) => {
  const desconfirmationLink = `https://script.google.com/macros/s/AKfycbzZ9oI77XjPiwAvEbzrdRpnR1FHOuZdBsk0N_nRJJboTUtaJ7EJaeZeiChHLqr-fp8/exec?sheetUrl=${encodeURIComponent(sheetUrl)}&scholarDNI=${encodeURIComponent(scholarDNI)}&sheetName=${encodeURIComponent(sheetName)}&limit=${encodeURIComponent(limit)}&formLInk=${encodeURIComponent(formLInk)}&addToCalendarUrl=${encodeURIComponent(addToCalendarUrl)}&scholarName=${encodeURIComponent(scholarName)}`
  let message;

  if (meetUrl == '') {
    message = createConfirmationMessage(scholarName, desconfirmationLink, workshopName, addToCalendarUrl);
  }
  else {
    message = `Hola!, Este correo confirma tu inscripcion a el taller: 
    ${workshopName}            

Este es el link de acceso a la reunion: ${meetUrl}

Si gustas, puedes agregar este evento a tu calendario con el siguiente link ${addToCalendarUrl}        `;
  }
  return message;
};
/**
 * Gets the name and the email of a registrant
 *
 * @param response the form response object of an entry
 * @returns the name and the email of a registrant
 */
const getResponses = (responses, individual) => {
  let resp = [];
  // let respo: Registrantresponse[] = [];
  if (individual === true) {
    //@ts-ignore
    let respo = new Registrantresponse;
    const individualResponses = responses;
    individualResponses.getItemResponses().forEach((r) => {
      const itemName = r.getItem().getTitle();
      const itemResponse = r.getResponse();
      switch (itemName) {
        case "Apellidos":
          respo.surnames = itemResponse;
          break;
        case "Correo electrónico":
          respo.email = itemResponse;
          break;
        case "Nombres":
          respo.names = itemResponse;
          break;
        case "Sexo":
          respo.sex = itemResponse;
          break;
        case "Cedula de Identidad":
          respo.dni = itemResponse;
          break;
        case "Mes y año ingreso a AVAA":
          respo.dni = itemResponse;
          break;
        case "Numero de Contacto":
          respo.phoneNumber = itemResponse;
          break;
      }
      // if (itemName === 'Correo electrónico' || "Apellidos" || "Nombres" || "Sexo" || "Cedula de Identidad" || "Mes y año ingreso a AVAA") {
      //   resp.push(itemResponse);
      // }
    });
    return respo;
  }
  else {
    const multipleResponses = responses;
    multipleResponses.forEach(response => {
      response.getItemResponses().forEach((r) => {
        const itemName = r.getItem().getTitle();
        const itemResponse = r.getResponse();
        if (itemName === 'Correo electrónico') {
          resp.push(itemResponse);
        }
      });
    });
    return resp;
  }
};
/**
 * Deletes the form, the data stored in {@linkcode scriptProperties} of the form and the `onFormSubmit` trigger associated with that form
 *
 * @param form the form class we want to close
 * @param triggerUid the trigger id of the `onFormSubmit `trigger to delete
 */
const closeForm = (form, triggerUid) => {
  // form.setAcceptingResponses(false);
  form.setCustomClosedFormMessage('Cupos agotados :(');
  const { deleteTrigger, uncompleteTrigger } = getFormIdividualData(triggerUid);
  if (deleteTrigger == undefined) {
    form.setAcceptingResponses(false);
    form.setCustomClosedFormMessage('Cupos agotados :(,');
    deleteTriger(uncompleteTrigger);
    deleteTriger(triggerUid);
    scriptProperties.deleteProperty(triggerUid);
    deleteTriger(uncompleteTrigger);
    uncompleteTrigger !== undefined ? scriptProperties.deleteProperty(uncompleteTrigger) : "m";
  }
  else {
    const value = {
      triggerUid: deleteTrigger
    };
    deleteForm(value);
  }
  deleteFile(form.getId());
};
const deleteForm = (e) => {
  let { submitTrigger, formId } = getFormIdividualData(e.triggerUid);
  const form = FormApp.openById(formId);
  scriptProperties.deleteProperty(submitTrigger);
  scriptProperties.deleteProperty(e.triggerUid);
  form.setAcceptingResponses(false);
  form.setCustomClosedFormMessage("Cupos agotados :(");
  deleteTriger(submitTrigger);
  deleteTriger(e.triggerUid);
  deleteFile(form.getId());
};

const updateFormConfirmationMessage = (numberOfRespones, limit) => {
  const message = `Los cupos para  esta actividad se han agotado.   :(

Quedaste de en la posicion numero ${(numberOfRespones - limit) + 1} en la lista de espera.

Te haremos saber cuando se desocupe un cupo via correo electronico :)`;
  return message

}
/**
 *
 * Si un formulario se cierra por que no queadn cupos lo que se hace es que, se deja abierto, pero se le manda a las personas que ya estan inscritas la info para acceder a la reunion.
 *
 * y con cada nueva entrada se le envia a la persona un correo con la info
 */
const uncompleteForm = (e) => {
  let { submitTrigger } = getFormIdividualData(e.triggerUid);
  let { workshopName, range, meetUrl, addToCalendarUrl, limit, unfull, end, formId } = getFormIdividualData(submitTrigger);
  const form = FormApp.openById(formId);
  unfull = true;
  const obj = {
    workshopName, range, meetUrl, addToCalendarUrl, limit, unfull, end, formId, submitTrigger
  };
  form.getResponses();
  const emails = [];
  const resp = getResponses(form.getResponses(), false);
  resp.forEach((r) => {
    emails.push(r);
  });
  sendEmailToRegistrants(emails, workshopName, meetUrl, addToCalendarUrl);
  const triggerId = createTrigger(form, "delete", new Date(end));
  storeFormData(obj, triggerId);
  storeFormData(obj, submitTrigger);
  deleteTriger(e.triggerUid);
  scriptProperties.deleteProperty(e.triggerUid);
};
/**
 * Function that is fired whenever somoene submits a form response.
 *
 * @param e the event object of the `onFormSubmit` event
 * @see {@link https://developers.google.com/apps-script/guides/triggers/events#form-submit_1} for reference about the event object
 */
const formSubmit = (e) => {
  const form = e.source;
  const numberOfResponses = form.getResponses().length;
  const triggerUid = e.triggerUid;
  const triggerUidString = triggerUid.toString();
  const { actualSpreadSheet } = getFormData();
  /**
 * This prevents collisions when multiple users are sending a form submision
 * @see {@link https://developers.google.com/apps-script/reference/lock/lock} For reference about look service.
 */
  const lock = LockService.getScriptLock();
  // Wait for up to 6 seconds for other processes to finish.
  lock.waitLock(6000);
  const spreadSheetResponse = SpreadsheetApp.openById(actualSpreadSheet);
  // with the first submision, gets all the values to make the form work.
  if (numberOfResponses < 2) {
    const values = getInitValues(form);
    storeFormData(values, triggerUidString);
    form.setCustomClosedFormMessage(triggerUidString);
  }
  const { workshopName, range, meetUrl, addToCalendarUrl, limit } = getFormIdividualData(triggerUidString);

  const actualSheet = spreadSheetResponse.getSheetByName(workshopName);
  //updates the value of the current number of registrants in the main spreadsheet.
  const resp = getResponses(e.response, true);
  const scholarNames = resp.names.split(" ")

  if (numberOfResponses <= limit) {
    sendEmailToRegistrants(resp.email, workshopName, meetUrl, addToCalendarUrl, spreadSheetResponse.getUrl(), resp.dni, workshopName, limit, form.getId(), scholarNames[0]);
    const cellForUpdate = COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS + range;
    sheet.getRange(cellForUpdate).setValue(numberOfResponses);
    if (numberOfResponses == limit) {
      const message = updateFormConfirmationMessage(numberOfResponses, limit)
      form.setConfirmationMessage(message)
    }
  }
  else if (numberOfResponses > limit) {
    const message = updateFormConfirmationMessage(numberOfResponses, limit)
    form.setConfirmationMessage(message)
  }

  actualSheet.appendRow([numberOfResponses, resp.surnames, resp.names, resp.dni, resp.phoneNumber, resp.email]);
  SpreadsheetApp.flush();
  // release the lock
  lock.releaseLock();
};

const sendEmailToRegistrants = (resp, workshopName, meetUrl, addToCalendarUrl, sheetUrl, scholarDNI, sheetName, limit, formLInk, name) => {
  const message = createEmailConfirmationMessage(workshopName, meetUrl, addToCalendarUrl, sheetUrl, scholarDNI, sheetName, limit, formLInk, name);
  const obj = {
    to: resp.toString(),
    fromName: "Kevin Bravo",
    fromEmail: "bravokevinto@gmail.com",
    subject: `Confirmacion de inscripcion a el taller: ${workshopName}`,
    htmlBody: message,
  };
  const raw = convert_(obj)
  const messaget = Gmail.newMessage();
  messaget.raw = raw;
  Gmail.Users.Messages.send(messaget, 'me');
};
const callProxyFunction = (functionName, functionArg) => {
  var baseURl = "https://script.google.com/macros/s/AKfycbxn4Bl7_a9flsxTeBly9Fm6D1r30owKU-72OcII72xud6NIBmTySETOfABecStMTho7gw/exec";
  var response = UrlFetchApp.fetch("".concat(baseURl, "?function=").concat(functionName, "&arguments=").concat(functionArg));
  return response;
};
const getSheetValues = (actualSheet) => {
  const NAME_CELL = "C2:D2";
  const SPEAKER_CELL = "C3:D3";
  const HOUR_CELL = "C4:D4";
  const KIND_OF_WORKSHOP_CELL = "C5:D5";
  const DATE_CELL = "F2:H2";
  const PENSUM_CELL = "F3:H3";
  const YEAR_CELL = "F4:H4";
  const PLATFORM_CELL = "F5:H5";
  const speaker = actualSheet.getRange(SPEAKER_CELL).getValue();
  const name = actualSheet.getRange(NAME_CELL).getValue();
  const hour = actualSheet.getRange(HOUR_CELL).getValue();
  const date = actualSheet.getRange(DATE_CELL).getValue();
  const pensum = actualSheet.getRange(PENSUM_CELL).getValue();
  const year = actualSheet.getRange(YEAR_CELL).getValue();
  const kindOfWorkshop = actualSheet.getRange(KIND_OF_WORKSHOP_CELL).getValue();
  const platform = actualSheet.getRange(PLATFORM_CELL).getValue();
  const workshop = [name, date, hour, speaker, pensum, kindOfWorkshop, platform, year];
  return workshop;
};