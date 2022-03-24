const COLUMN_FOR_MEETURL = 'Q'
const COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS = 'O'
const COLUMN_FOR_THE_LIMIT_DATA = 'H'

//Get the values (range, meet URl, addURl, nombre del taller, )
const getInitValues = (form) => {
  const rawMessage = form.getCustomClosedFormMessage().split('\-/');
  const workshopName = form.getTitle()
  const range = rawMessage[0];
  const addToCalendarUrl = rawMessage[1];
  const meetRange = COLUMN_FOR_MEETURL + range
  const limitRange = COLUMN_FOR_THE_LIMIT_DATA + range

  const meetUrl = sheet.getRange(meetRange).getValue()
  const limit = sheet.getRange(limitRange).getValue()

  const values = {
    workshopName,
    range,
    meetUrl,
    addToCalendarUrl,
    limit
  }
  return values;
}
//con cada sumbmision actualizar el dato en el spreadsheet.

const storeFormData = (data, key) => {
  const jsonData = JSON.stringify(data)
  scriptProperties.setProperty(key, jsonData)

}

const getFormIdividualData = (key) => {
  const data = scriptProperties.getProperty(key);
  const formatedData = JSON.parse(data)
  return formatedData

}
const formSubmit = (e) => {
  const form = e.source
  const numberOfResponses = form.getResponses().length
  const triggerUid = e.triggerUid
  const resp = {};
  if (numberOfResponses < 2) {
    const values = getInitValues(form)
    storeFormData(values, triggerUid)
  }
  const responses = e.response.getItemResponses()

  const { workshopName, range, meetUrl, addToCalendarUrl, limit } = getFormIdividualData(triggerUid);

  responses.forEach(r => {
    const itemName = r.getItem().getTitle()
    const itemResponse = r.getResponse()
    if (itemName === 'Nombre  y Apellido') {
      resp.name = itemResponse
    }
    if (itemName === 'Email') {
      resp.email = itemResponse
    }

  })

  const cellForUpdate = COLUMN_FOR_UPDATE_NUMBER_OF_PARTCICIPANTS + range
  sheet.getRange(cellForUpdate).setValue(numberOfResponses)

  if (numberOfResponses >= limit) {
    form.setCustomClosedFormMessage('Cupos agotados!')
    form.setAcceptingResponses(false);
    deleteTriger(triggerUid)
    scriptProperties.deleteProperty(triggerUid)
  }
  const message = createEmailConfirmationMessage(resp, workshopName, meetUrl, addToCalendarUrl);

  MailApp.sendEmail(resp.email, `Confirmacion de inscripcion a ${workshopName}`, message)

}

const deleteTriger = (triggerUid) => {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getUniqueId() === triggerUid) {
      ScriptApp.deleteTrigger(triggerUid)
    }
  })
}


const createEmailConfirmationMessage = (resp, workshopName, meetUrl, addToCalendarUrl) => {
  let message;
  if (meetUrl == '') {
    message = `Hola ${resp.name}!, Este correo confirma tu inscripcion a ${workshopName}.

Si gustas, puedes agregar este evento a tu calendario con este link ${addToCalendarUrl}
  `
  }
  else {
    message = `Hola ${resp.name}!, Este correo confirma tu inscripcion a ${workshopName}

Este es el link de acceso a la reunion: ${meetUrl}

Si gustas, puedes agregar este evento a tu calendario con este link ${addToCalendarUrl}
  `
  }

  return message;
}
