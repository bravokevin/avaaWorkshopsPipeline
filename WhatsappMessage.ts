/**
 * Creates a text with all the details about a workshop.
 */
const createDisplayMessage = () => {
    const ui = SpreadsheetApp.getUi();
    const result = ui.prompt("Coloca el identificador del taller:");
    if(result.getSelectedButton() === ui.Button.CANCEL) return;
    if(result.getResponseText() === '') return;
    const range = result.getResponseText().toString();
    const rangeName = `${SHEET_NAME}!${START_COLUMN}${range}:${END_COLUMN}${range}`
    const values = getWorkshopsDetails(rangeName)![0];

    if (values[0] === '') {
        //@ts-ignore
        ui.alert("No hay un taller con ese identificador",
            "Por favor, coloca un identificador de un taller existente",
            ui.ButtonSet.OK
        );
    }
    else {
        const response: GoogleAppsScript.Base.Button = ui.alert(
            "Tipo de mensaje",
            "¿Deseas que este mensaje este formateado para WhatsApp?",
            ui.ButtonSet.YES_NO
        )
        //@ts-ignore
        const workshop = new Workshop(...values);
        let text: string = '';
        if (response == ui.Button.YES) {
            text = createFormDescription(workshop, true);
        }
        else if (response == ui.Button.NO) {
            text = createFormDescription(workshop);
        }
        ui.alert("Aqui tienes el mensaje. Click derecho y copiar", text, ui.ButtonSet.OK);
    }
}