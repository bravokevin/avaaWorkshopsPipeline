const temporalFunction = (workshopData, emailSubject, groupName) => {
  //1 debemos agarrar cual es el ultimo valor del id para colocarlo
  // una vez colocados los valores se agarra y se envia. con el mismo proceso de siempre. se ejecuta main()
  const newWorkshops = []
  workshopData.forEach(workshop => {
    const lastId = getLastRowFirstColumnValue();
    const nextValue = Number(lastId) + 1;
    const { name, date, startHour, id, endHour, speaker, pensum, avaaYear, kindOfWorkshop, platform, description, numberOfParticipants } = workshop;
    workshop.id = nextValue;

    sheet.appendRow(["", "", workshop.id, name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, description, avaaYear.toString().replaceAll(',', ' y ')])
    newWorkshops.push(workshop)
  })
  SpreadsheetApp.flush();
  main(newWorkshops, emailSubject, groupName, true)
}
//arreglar el tema del id en el workshop
function getLastRowFirstColumnValue() {
  var lastRow = sheet.getLastRow();
  var firstColumnValue = sheet.getRange(lastRow, 3).getValue();
  Logger.log(firstColumnValue)
  return firstColumnValue;
}