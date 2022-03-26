// SpreadsheetUI.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module 
 */

const RANGE_FOR_GROUP_NAME = 'E7';

const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Enviar talleres', 'sendWorkshop')
    .addToUi();
}

const sendWorkshop = () => {
  const talleresEnviados: string[] = [];
  let values: any[];
  const ui = SpreadsheetApp.getUi()
  const groupName = sheet.getRange(RANGE_FOR_GROUP_NAME).getValue()
  try {
    values = getWorkshopsDetails()!;
    values.forEach(value => {
      talleresEnviados.push(`* ${value[0]}`)
    })
  }
  catch (e) {
    ui.alert(e)
    return
  }
  const prompt = ui.prompt('Coloca el asunto del correo')
  const promptResponse = prompt.getResponseText()
  // try {
  //   ContactsApp.getContactGroup(groupName)
  // }
  // catch (e) {
  //   const ui = SpreadsheetApp.getUi();
  //   ui.alert(e)
  //   return
  // }
  try {
    main(values, promptResponse, groupName)
  }
  catch (e) {
    ui.alert(e)
  }
  //Once finished inform throught the UI that the process was completed succesfully
  SpreadsheetApp.getUi()
    .alert(`Los talleres: \n ${talleresEnviados.toString().replaceAll(',', '\n')} \n han sido enviados exitosamente!!`);
}