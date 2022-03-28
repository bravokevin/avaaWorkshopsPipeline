const createGmailMessageLink = (recipients: string[], workshopName: string) => {

    const subject = `TALLER SUSPENDIDO: "${workshopName}"`;
    const encodedSubject = encodeURIComponent(subject);
    const message = `Queridos becarios, 

Lamentamos informarles que el taller "${workshopName}" ha sido suspendido.

El mismo sera reprogramado y se les estara informando por este medio. 

Ofrecemos disculpas por las molestias ocacionadas.

Un abrazo!!
`
    const encodedMessage = encodeURIComponent(message)

    const createMessageLink = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ghostering@mail.com&su=${encodedSubject}&body=encodedMessage&bcc=${recipients}`

    return createMessageLink;
}

const suspendWorkshop = () => {
    const ui = SpreadsheetApp.getUi();
    const result = ui.prompt("Coloca el enlace del formulario del taller que deseas suspendar:");
    let form: GoogleAppsScript.Forms.Form;
    try {
        form = FormApp.openByUrl(result.getResponseText())
    }
    catch (e) {
        ui.alert("Error: El enlace que introduciste es invalido",
            "Por favor, coloca un enlace de formulario valido ",
            ui.ButtonSet.OK
        );
        return;
    }
    const workshopName = form.getTitle();
    const resp = getResponses(form.getResponses());
    const messageLink = createGmailMessageLink(resp, workshopName);;
}

