const createWhatsAppMessage = () => {
    const ui = SpreadsheetApp.getUi();
    const result = ui.prompt("Coloca el identificador del taller:");
    let form: GoogleAppsScript.Forms.Form;
    const range = result.getResponseText().toString();
    const sheetRange = `D${range}:M${range}`
    const values = sheet.getRange(sheetRange).getValues()[0];

    if (values[0] === '') {
        //@ts-ignore
        const workshop = new Workshop(...values);
        const message = createFormDescription(workshop);
        ui.alert("Aqui tienes el mensaje. Click derecho y copiar", message, ui.ButtonSet.OK);

    }
    else {
        ui.alert("Error: El enlace que introduciste es invalido",
            "Por favor, coloca un enlace de formulario valido ",
            ui.ButtonSet.OK
        );
        return
    }
}