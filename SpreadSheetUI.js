const onOpen = () => {
    const ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('Custom Menu')
      .addItem('sendWorkshop', 'sendWorkshop')
      .addToUi();
  }
  
  const sendWorkshop = () => {
    // const values = mainAutomatizationProject.getWorkshopsDetails();
    const talleresEnviados = [];
  
    values.forEach(value =>{
      talleresEnviados.push(`* ${value[0]}`)
    })
  
  //una ves terminado informar a la UI que el script se ejecuto con exito
    SpreadsheetApp.getUi()
      .alert(`Los talleres: \n ${talleresEnviados.toString().replaceAll(',', '\n')} \n han sido enviados exitosamente!!`);
  
  }
  