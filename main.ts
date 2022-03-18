const COLUMN_FOR_MEETING_URL = 'Q'

const setMeetUrl = (number, meetUrl) => {
  const rangeName = `${COLUMN_FOR_MEETING_URL}${number}`
  const cell = sheet.getRange(rangeName)
  cell.setValue(meetUrl)
}


const spreadSheetMain = () => {
  //getting all the necessarie values
  const workshopsValuesArr = getWorkshopsDetails();
  const processedWorkshopData = processData(workshopsValuesArr);
  const [scheduledWOrkshops, workshopsToSendASAP] = processWorkshopType(processedWorkshopData);

  const workshopsToSendASAPFinalDataArr = []
  const scheduledWOrkshopsFinalArr = []

  if (scheduledWOrkshops.length >= 1) {

    
    // storeValues(scheduledWOrkshops, SCRIPT_PROPERTIES_WORKSHOPS_KEY)
  }
  // aqui solo estamos tomando en cuenta que hay un solo taller, arreglarlo para que puedan haber varios.
  if (workshopsToSendASAP.length >= 1) {

    workshopsToSendASAP.forEach(w => {
      const workshopsToSendASAPFinalDataObj = {}
      const [meetLink, addUrl] = calendarMain(w);

      setMeetUrl(w.id, meetLink);

      workshopsToSendASAPFinalDataObj.workshop = w;

      [workshopsToSendASAPFinalDataObj.formUrl, workshopsToSendASAPFinalDataObj.completeFormUrl] = createForm(w, addUrl)

      workshopsToSendASAPFinalDataArr.push(workshopsToSendASAPFinalDataObj)

    })
      sendEmails(workshopsToSendASAPFinalDataArr, "Prueba - Invitacion a talleres de la semana tal a tal");
      // telegramMain(workshopsToSendASAPFinalDataArr)
  }
  //se update el rango d ela verga esta
  // updateSheetRange()
}

const calendarMain = (values) => {
  const eventId = createEvent(values)
  const meetLink = getMeetEventLink(eventId);
  const addUrl = getPublicEventLink(eventId);
  return [meetLink, addUrl]
}





const sendScheduledWorkshops = () =>{
  const workshopsData = scriptProperties.get(SCRIPT_PROPERTIES_WORKSHOPS_KEY)
  const allWorkshops = JSON.parse(workshopsData)
}








