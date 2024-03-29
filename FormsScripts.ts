//--------------------------------------------------------- Constants ---------------------------------------------------------------
/**
 * Months of the years
 * 
 * This is used when creating a new Spreeadsheet to store the registration data for each workshop
 */
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/**
 * Script Property service key for store all deta related to the forms 
 */
const SCRIPT_PROPERTIES_FORM_KEY = 'CURRENT_FORM_DATA'

//--------------------------------------------------------- Utils Functions ---------------------------------------------------------------

/**
 * Creates a description with the details of the workshop
 *  
 * @param workshop - the {@linkcode Workshop} class 
 * @returns a description with all the details of the workshop
 */
const createFormDescription = (workshop: Workshop, whatsapp: boolean = false) => {
  const { name, pensum, date, startHour, endHour, speaker, kindOfWorkshop, platform, description } = workshop;
  if (whatsapp === false) {
    const formDescription = `Taller: ${name}
Competencia: ${pensum}
Fecha: ${date}
Horario: de ${startHour} hasta las ${endHour}
Facilitador: ${speaker}
Modalidad: ${kindOfWorkshop}
${kindOfWorkshop === "Presencial" ? 'Lugar: Oficinas de Avaa' : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
    return formDescription;
  }
  else {
    const formDescription = `*Taller:* ${name}
*Competencia:* ${pensum}
*Fecha:* ${date}
*Horario:* de ${startHour} hasta las ${endHour}
*Facilitador:* ${speaker}
*Modalidad:* ${kindOfWorkshop}
${kindOfWorkshop === "Presencial" ? '*Lugar:* Oficinas de Avaa' : `*Plataforma:* ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
    return formDescription;
  }

}

/**
 * Sets a the name of the sheet in where all the response of the form would be stored as the name of a workshop that is link to that form
 * 
 *@description It uses recursion in the case we have an error saying "sheet already exist" to set an incremental value (the `numb` parameter), whitin parentesis,  following the sheet name to avoid that error to stop the program. 
 * 
 *  We cannot have two workshops named "Liderazgo" due to the configuration of the sheets, but we can seet a second workshop with that name with an incremental value that will allow us to have multiple sheets with the same name. Example: 
 * 
 * - the first instace will be"Liderazgo"
 * - the second instace will be "Liderazgo (1)"
 * - the third instace will be "Liderazgo (2)" and so on
 * 
 * @param ss the spreadsheet we want to grab to set the the name of the newly created Sheet
 * @param tittle The tittle of the sheet (The workshop's tittle)
 * @param numb a param that allows us to set an increment if there are two sheets with the same name 
 */
const setSheetName = (ss: GoogleAppsScript.Spreadsheet.Spreadsheet, tittle: string, numb: number = 0) => {
  const sheets = ss.getSheets();
  const actualSheet = sheets[0]
  /**
   * starts with `1`, and with the following excecutions starts with `0` to have an incremental
   */
  let num: number = numb === 0 ? 1 : 0;
  let sheetTittle = tittle;
  try {
    actualSheet.setName(sheetTittle)
  }
  catch (e) {
    num += numb;
    /**
     * substract the `(num)` part of the string to avoid the tittle have multiple parenteses. eg. `tittle(num)(num)(num)`
     */ 
    sheetTittle = numb === 0 ? `${tittle}(${num})`:`${tittle.slice(0,tittle.length-3)}(${num})`;
    setSheetName(ss, sheetTittle, num + 1)
  }
}

/**
 * Creates the sheet in where we want to store all the registries for an specific form 
 * 
 * @description sets the destination of the form responses for the `form` given as parameter
 *
 * It evaluates the date to see if we are still in `storedMonth` if so, it only creates a new sheet in the Spreadsheet (which id is store in the {@linkcode scriptProperties}) to store the form responses of an specific form 
 * 
 * if we are in a diferent month than the `storedMonth` it creates a new spreadsheet and sets the default sheet as a destination of the form responses. Also, store the id of that new spreadsheet in the {@linkcode scriptProperties} using {@linkcode updateFormData}
 * 
 * @param form the form class object   
 * @returns the spreadsheet which we set to store the form responses of `form` 
 * 
 * @see {@link https://developers.google.com/apps-script/reference/forms/form#setDestination(DestinationType,String)} for reference about setDestination method
 */
const createSpreadSheetFormResponse = (form: GoogleAppsScript.Forms.Form) => {
  const myDate = new Date()
  const currentMonth = Number(myDate.getMonth().toFixed());
  const { storedMonth, actualSpreadSheet } = getFormData()

  if (currentMonth === storedMonth) {
    let ss = SpreadsheetApp.openById(actualSpreadSheet);
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())
    return ss
  }
  else {
    const ss = createSpreadSheet(MONTHS[currentMonth])
    updateFormData(ss);
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())
    return ss
  }
}

/**
 * it updates the data stored in the {@linkcode scriptProperties} under the {@linkcode SCRIPT_PROPERTIES_FORM_KEY} key 
 * 
 * @summary it stores the Date (the current month in were we are) and the new spreadsheet id created
 * @description since {@linkcode scriptProperties} only accepts strings as parameters we have to parse the object data to be a string before we can store it 
 * @param ss the reciently created spreadsheet object
 */
const updateFormData = (ss: GoogleAppsScript.Spreadsheet.Spreadsheet) => {
  const myDate = new Date()
  const currentMonth = Number(myDate.getMonth().toFixed());
  const ssId = ss.getId()
  const updatedData = {
    storedMonth: currentMonth,
    actualSpreadSheet: ssId
  }
  const jsonUpdatedData = JSON.stringify(updatedData)
  scriptProperties.setProperty(SCRIPT_PROPERTIES_FORM_KEY, jsonUpdatedData)
}


/**
 * Gets all the data stored in {@linkcode scriptProperties} under the {@linkcode SCRIPT_PROPERTIES_FORM_KEY} key 
 * 
 * It evaluates if there are data stored in the `Property service` if not, creates a new spreadsheet using {@linkcode createSpreadSheet} and stores the newly created spreadsheet id and the current month in where we are.
 * 
 * @returns returns all the form data parsed in `JSON` format
 */
const getFormData = () => {
  let jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
  //If this is the first time pulling the data creates it 
  if (jsonFormData === null) {
    const myDate = new Date()
    const currentMonth = Number(myDate.getMonth().toFixed());
    const ss = createSpreadSheet(MONTHS[currentMonth])
    updateFormData(ss)
    jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
  }
  const formDataParsed = JSON.parse(jsonFormData!);
  return formDataParsed;
}


/**
 * it creates a new `onFormSubmit` trigger for the specified form
 * @param form the form class object   
 * @see {@link https://developers.google.com/apps-script/guides/triggers/installable} for reference about triggers
 * @see {@Link https://developers.google.com/apps-script/reference/script/form-trigger-builder} for reference about FormTriggerBuilder class
 */

const createTrigger = (form: GoogleAppsScript.Forms.Form, type: string, date?: Date): string => {
  let trigger: GoogleAppsScript.Script.Trigger;
  if (type === "submit") {
    trigger = ScriptApp.newTrigger('formSubmit')
      .forForm(form)
      .onFormSubmit()
      .create();
    return trigger.getUniqueId();
  }
  else if (type === "delete") {
    trigger = ScriptApp.newTrigger('deleteForm')
      .timeBased()
      .at(date!)
      .create();
    return trigger.getUniqueId();
  }
  else if (type === "uncomplete") {
    trigger = ScriptApp.newTrigger('uncompleteForm')
      .timeBased()
      .at(date!)
      .create();
    return trigger.getUniqueId()
  }
  else {
    return 'NONE'
  }
}

//--------------------------------------------------------- Main Function ---------------------------------------------------------------


/**
 * It creates a new form 
 * 
 * it creates a form using {@linkcode copyForm} method, then gets the form object by using `FormApp.openById` to set all the necesary values of the form
 * 
 * we set the `id` in the form's closed message at the begining since is dificult to share data betwen scripts, so we store the id and the "add to my calendar" url to be able to grab that data from each one of the forms and be able to send the confimation message to every participant
 * 
 * @param data a {@linkcode Workshop} class object with all the data of an specific workshop
 * @param addUrl "Add to my calendar" link
 * @returns the shorten and unshorten url versions of the newly created form 
 */
const createForm = (data: Workshop, addUrl: string) => {
  const { id, name, date, startHour, endHour } = data;
  // adds 30 minutes to the start hour of the workshop
  const start = new Date(date + startHour).getTime() - 1800000;
  const formDescription = createFormDescription(data);
  const formCopyId = copyForm(name);
  const form = FormApp.openById(formCopyId);
  const confirmationMessage = createFormConfirmationMessage(addUrl);
  form.setDescription(formDescription);
  form.setConfirmationMessage(confirmationMessage);
  form.setTitle(name);
  //stores the id and the "add to my calendar url"
  form.setCustomClosedFormMessage(id + '-/' + addUrl);
  //creates a trigger 'onFormSubmit' for every form.
  const submitTrigger = createTrigger(form, "submit");
  const closeForm = createTrigger(form, "uncomplete", new Date(start));
  const end = new Date(new Date(date + endHour).getTime() + 600000).toDateString();
  const triggersData: IndividualFormData = {
    submitTrigger,
    uncompleteTrigger: closeForm,
    end
  }
  form.setCustomClosedFormMessage(id + '-/' + addUrl + '-/' + submitTrigger);

  storeFormData(triggersData, submitTrigger);

  const formUrl = form.getPublishedUrl();
  const formShortenUrl = form.shortenFormUrl(formUrl);
  const ss = createSpreadSheetFormResponse(form);
  /**
   * @see {@link https://stackoverflow.com/questions/63213064/form-responses-spreadsheet-getsheets-doesnt-return-responses-sheet} for reference about using `flush`
   */
  SpreadsheetApp.flush();
  setSheetName(ss, name);

  return [formShortenUrl, formUrl, submitTrigger];
}

/**
 * Creates a confirmation message to the form Confirmation message
 * 
 * @param addToMyCalendarLink 
 * @returnsthe the confirmation message 
 */
const createFormConfirmationMessage = (addToMyCalendarLink: string) => {

  const confirmationMessage = `Perfecto, tu participación se ha registrado exitosamente!

Si deseas, puedes añadir este evento a tu calendario = ${addToMyCalendarLink}`;

  return confirmationMessage;
}

/**
 * Creates a form template for sending workshops.
 * 
 * @returns The id of the newly created form 
 */
const createTemplateForm = (destinationFolder: GoogleAppsScript.Drive.Folder) => {
  const form = FormApp.create('Formulario Template Para Talleres');
  form.addTextItem().setTitle('Appellidos').setRequired(true);
  form.addTextItem().setTitle('Nombres').setRequired(true);
  form.addTextItem().setTitle('Correo electrónico').setRequired(true);
  const formId = form.getId()
  // form.addTextItem().setTitle('Mes y año de ingreso').setHelpText('Ejemplo: Agosto 2019');
  // form.addTextItem().setTitle('Cedula de Identidad')
  const file = DriveApp.getFileById(formId)
  file.moveTo(destinationFolder)
  return formId;
}