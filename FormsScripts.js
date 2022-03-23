const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const SCRIPT_PROPERTIES_FORM_KEY = 'CURRENT_FORM_DATA'


/**
 * Creates a form by copying the template form 
 * param {string} the name of the workshop which if going to be set as the form tittle.
 * returns {Array<Strings>} returns the shorten url and the normal url of the form.
 */
const createForm = (data, addUrl) => {
  const { id, name, pensum, date, startHour, endHour, speaker, kindOfWorkshop, platform, } = data;

  const description = `Taller: ${name}
Competencia: ${pensum}
Fecha: ${date}
Horario: de ${startHour} hasta las ${endHour}
Facilitador: ${speaker}
Modalidad: ${kindOfWorkshop}
Plataforma: ${platform}
  `
  const formCopyId = copyForm();
  const formCopy = FormApp.openById(formCopyId)
  formCopy.setCustomClosedFormMessage(id + '-/' + addUrl)
  formCopy.setDescription(description)
  const form = formCopy.setTitle(name)

  //creates a trigger 'onFormSubmit' for every created form.
  ScriptApp.newTrigger('formSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();

  const formUrl = form.getPublishedUrl();
  const formShortenUrl = form.shortenFormUrl(formUrl)
  const ss = createSpreadSheetFormResponse(form)
  SpreadsheetApp.flush() //https://stackoverflow.com/questions/63213064/form-responses-spreadsheet-getsheets-doesnt-return-responses-sheet
  setSheetName(ss, name)

  return [formShortenUrl, formUrl]
}

const setSheetName = (ss, tittle, numb = 0) => {
  const sheets = ss.getSheets();
  const actualSheet = sheets[0]
  let num;
  try {
    actualSheet.setName(tittle)
  }
  catch (e) {
    num += numb;
    if (e === `Exception: A sheet with the name "${tittle}" already exists. Please enter another name.`) {
      setSheetName(ss, tittle + `(${num})`, num + 1)
    }
  }
  return true;
}

const createSpreadSheetFormResponse = (form) => {

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

const updateFormData = (spreadSheet) => {
  const myDate = new Date()
  const currentMonth = Number(myDate.getMonth().toFixed());
  const ssId = spreadSheet.getId()
  const updatedData = {
    storedMonth: currentMonth,
    actualSpreadSheet: ssId
  }
  const jsonUpdatedData = JSON.stringify(updatedData)
  scriptProperties.setProperty(SCRIPT_PROPERTIES_FORM_KEY, jsonUpdatedData)
}

const getFormData = () => {
  let jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
  //If this is the first time pulling the data
  if (jsonFormData === null) {
    const myDate = new Date()
    const currentMonth = Number(myDate.getMonth().toFixed());
    const ss = createSpreadSheet(MONTHS[currentMonth])
    updateFormData(ss)
    jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
  }
  const formDataParsed = JSON.parse(jsonFormData);
  return formDataParsed;
}


