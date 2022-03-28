// SpreadsheetUI.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module 
 */

/**
 * The column from where we get the Group name we want to send the workshops
 */
const RANGE_FOR_GROUP_NAME = 'E7';

const LAST_WORKSHOP_PROPWETY_KEY = "last_workshop_property";

const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Para enviar Talleres')
    .addItem('Iniciar!', 'init')
    .addItem('Enviar talleres', 'sendWorkshop')
    .addItem('Suspender Taller', 'suspendWorkshop')
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
      talleresEnviados.push(`- ${value[1]}`)
    })
  }
  catch (e) {
    ui.alert(
      'Please confirm',
      'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);

    return
  }
  if (ContactsApp.getContactGroup(groupName) === null) {
    ui.alert('Ocurrio un problema!', 'Este grupo de contactos no existe. Ingresa un grupo de contacto existente.', ui.ButtonSet.OK);
    return;
  }
  const lastWorkshopStored = scriptProperties.getProperty(LAST_WORKSHOP_PROPWETY_KEY)

  if (values.length === 1 && values[0][0].toString() === lastWorkshopStored) {
    const result = ui.alert(
      `El taller "${values[0][1]}" ya fue enviado`,
      '¿Deseas enviarlo de nuevo?',
      ui.ButtonSet.YES_NO);
    // Process the user's response.
    if (result == ui.Button.NO) return
  }
  const prompt = ui.prompt('Coloca el asunto del correo')
  const promptResponse = prompt.getResponseText()

  try {
    main(values, promptResponse, groupName)
  }
  catch (e) {
    ui.alert(e)
    return
  }
  scriptProperties.setProperty(LAST_WORKSHOP_PROPWETY_KEY, values[0][0].toString())
  //Once finished inform throught the UI that the process was completed succesfully
    ui.alert(`Los talleres: \n ${talleresEnviados.toString().replaceAll(',', '\n')} \n han sido enviados exitosamente!!`);
}
