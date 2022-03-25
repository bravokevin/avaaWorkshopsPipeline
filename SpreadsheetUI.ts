// SpreadsheetUI.ts
/**
 * @author Kevin Bravo <@kevbto> <bravokevinto@gmail.com>
 * @module 
 */

const onOpen = () => {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom Menu')
      .addItem('Enviar talleres', 'sendWorkshop')
      .addToUi();
  }
  
  const sendWorkshop = () => {
    const values = getWorkshopsDetails();
    const talleresEnviados:string[] = [];
  
    values!.forEach(value =>{
      talleresEnviados.push(`* ${value[0]}`)
    })
  
    //Once finished inform throught the UI that the process was completed succesfully
    SpreadsheetApp.getUi()
      .alert(`Los talleres: \n ${talleresEnviados.toString().replaceAll(',', '\n')} \n han sido enviados exitosamente!!`);
  
  }