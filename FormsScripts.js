// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
//--------------------------------------------------------- Constants ---------------------------------------------------------------
/**
 * Months of the years
 *
 * This is used when creating a new Spreeadsheet to store the registration data for each workshop
 */
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
/**
 * Script Property service key for store all deta related to the forms
 */
const SCRIPT_PROPERTIES_FORM_KEY = 'CURRENT_FORM_DATA';
//--------------------------------------------------------- Utils Functions ---------------------------------------------------------------
/**
 * Creates a description with the details of the workshop
 *
 * @param workshop - the {@linkcode Workshop} class
 * @returns a description with all the details of the workshop
 */
const createFormDescription = (workshop, whatsapp = false) => {
    const { name, pensum, date, startHour, endHour, speaker, kindOfWorkshop, platform, description } = workshop;
    if (whatsapp === false) {
        const formDescription = `Taller: ${name}
Competencia Asociada: ${pensum}
${kindOfWorkshop === "Asincrono" ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(addDays(new Date(date), 3)).toLocaleDateString()}` : `Fecha: ${date}` }
${kindOfWorkshop === "Asincrono" ? `` : `Horario: de ${startHour} hasta las ${endHour}` }
Facilitador: ${speaker}
Modalidad: ${kindOfWorkshop}
${kindOfWorkshop === "Presencial" ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
        return formDescription;
    }
    else {
        const formDescription = `*Taller:* ${name}
*Competencia:* ${pensum}
*Fecha:* ${date}
*Horario:* de ${startHour} hasta las ${endHour}
*Facilitador:* ${speaker}
*Modalidad:* ${kindOfWorkshop}
${kindOfWorkshop === "Presencial" ? '*Lugar:* Oficinas de Avaa' : `*Plataforma:* ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
        return formDescription;
    }
};
/**
 * Sets the name of the sheet in where all the response for an specific workshop would be saved
 *
 *@description It uses recursion in the case we have an error saying "sheet already exist" to set an incremental value (the `numb` parameter), whitin parentesis,  following the sheet name to avoid that error to stop the program.
 *
 *  We cannot have two workshops named "Liderazgo" due to the configuration of the sheets, but we can seet a second workshop with that name with an incremental value that will allow us to have multiple sheets with the same name. Example:
 *
 * - the first instace will be"Liderazgo"
 * - the second instace will be "Liderazgo (1)"
 * - the third instace will be "Liderazgo (2)" and so on
 *
 * @param ss the spreadsheet we want to grab to set the the name of the newly created Sheet
 * @param tittle The tittle of the sheet (The workshop's tittle)
 * @param numb a param that allows us to set an increment if there are two sheets with the same name
 */
const setSheetName = (ss, tittle, numb = 0) => {
    const sheets = ss.getSheets();
    const sheetForRename = sheets.length === 1 ? 0 : sheets.length - 1;
    const actualSheet = sheets[sheetForRename];
    /**
     * starts with `1`, and with the following excecutions starts with `0` to have an incremental
     */
    let num = numb === 0 ? 1 : 0;
    let sheetTittle = tittle;
    try {
        actualSheet.setName(sheetTittle);
    }
    catch (e) {
        num += numb;
        /**
         * substract the `(num)` part of the string to avoid the tittle have multiple parenteses. eg. `tittle(num)(num)(num)`
         */
        sheetTittle = numb === 0 ? `${tittle}(${num})` : `${tittle.slice(0, tittle.length - 3)}(${num})`;
        setSheetName(ss, sheetTittle, num + 1);
    }
    return sheetTittle;
};
/**
 * Creates the sheet in where we want to store all the registries for an specific form
 *
 * @description sets the destination of the form responses for the `form` given as parameter
 *
 * It evaluates the date to see if we are still in `storedMonth` if so, it only creates a new sheet in the Spreadsheet (which id is store in the {@linkcode scriptProperties}) to store the form responses of an specific form
 *
 * if we are in a diferent month than the `storedMonth` it creates a new spreadsheet and sets the default sheet as a destination of the form responses. Also, store the id of that new spreadsheet in the {@linkcode scriptProperties} using {@linkcode updateFormData}
 *
 * @param form the form class object
 * @returns the spreadsheet which we set to store the form responses of `form`
 *
 * @see {@link https://developers.google.com/apps-script/reference/forms/form#setDestination(DestinationType,String)} for reference about setDestination method
 */
const createSpreadSheetFormResponse = (form) => {
    const myDate = new Date();
    const currentMonth = Number(myDate.getMonth().toFixed());
    const { storedMonth, actualSpreadSheet } = getFormData();
    if (currentMonth === storedMonth) {
        let ss = SpreadsheetApp.openById(actualSpreadSheet);
        const source = SpreadsheetApp.openById(SPREADSHEET_TEMPLATE_FOR_FORM_VALIDATION_ID);
        const sheetToCpy = source.getSheets()[0];
        sheetToCpy.copyTo(ss);
        return ss;
    }
    else {
        const ss = createSpreadSheet(MONTHS[currentMonth]);
        const source = SpreadsheetApp.openById(SPREADSHEET_TEMPLATE_FOR_FORM_VALIDATION_ID);
        const sheetToCpy = source.getSheets()[0];
        sheetToCpy.copyTo(ss);
        updateFormData(ss);
        return ss;
    }
};
/**
 * it updates the data stored in the {@linkcode scriptProperties} under the {@linkcode SCRIPT_PROPERTIES_FORM_KEY} key
 *
 * @summary it stores the Date (the current month in were we are) and the new spreadsheet id created
 * @description since {@linkcode scriptProperties} only accepts strings as parameters we have to parse the object data to be a string before we can store it
 * @param ss the reciently created spreadsheet object
 */
const updateFormData = (ss) => {
    const myDate = new Date();
    const currentMonth = Number(myDate.getMonth().toFixed());
    const ssId = ss.getId();
    const updatedData = {
        storedMonth: currentMonth,
        actualSpreadSheet: ssId
    };
    const jsonUpdatedData = JSON.stringify(updatedData);
    scriptProperties.setProperty(SCRIPT_PROPERTIES_FORM_KEY, jsonUpdatedData);
};
/**
 * Gets all the data stored in {@linkcode scriptProperties} under the {@linkcode SCRIPT_PROPERTIES_FORM_KEY} key
 *
 * It evaluates if there are data stored in the `Property service` if not, creates a new spreadsheet using {@linkcode createSpreadSheet} and stores the newly created spreadsheet id and the current month in where we are.
 *
 * @returns returns all the form data parsed in `JSON` format
 */
const getFormData = () => {
    let jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
    //If this is the first time pulling the data creates it 
    if (jsonFormData === null) {
        const myDate = new Date();
        const currentMonth = Number(myDate.getMonth().toFixed());
        const ss = createSpreadSheet(MONTHS[currentMonth]);
        updateFormData(ss);
        jsonFormData = scriptProperties.getProperty(SCRIPT_PROPERTIES_FORM_KEY);
    }
    const formDataParsed = JSON.parse(jsonFormData);
    return formDataParsed;
};
/**
 * it creates a new `onFormSubmit` trigger for the specified form
 * @param form the form class object
 * @see {@link https://developers.google.com/apps-script/guides/triggers/installable} for reference about triggers
 * @see {@Link https://developers.google.com/apps-script/reference/script/form-trigger-builder} for reference about FormTriggerBuilder class
 */
const createTrigger = (form, type, date) => {
    let trigger;
    if (type === "submit") {
        trigger = ScriptApp.newTrigger('formSubmit')
            .forForm(form)
            .onFormSubmit()
            .create();
        return trigger.getUniqueId();
    }
    else if (type === "delete") {
        trigger = ScriptApp.newTrigger('deleteForm')
            .timeBased()
            .at(date)
            .create();
        return trigger.getUniqueId();
    }
    else if (type === "uncomplete") {
        trigger = ScriptApp.newTrigger('uncompleteForm')
            .timeBased()
            .at(date)
            .create();
        return trigger.getUniqueId();
    }
    else {
        return 'NONE';
    }
};
//--------------------------------------------------------- Main Function ---------------------------------------------------------------
/**
 * It creates a new form
 *
 * it creates a form using {@linkcode copyForm} method, then gets the form object by using `FormApp.openById` to set all the necesary values of the form
 *
 * we set the `id` in the form's closed message at the begining since is dificult to share data betwen scripts, so we store the id and the "add to my calendar" url to be able to grab that data from each one of the forms and be able to send the confimation message to every participant
 *
 * @param data a {@linkcode Workshop} class object with all the data of an specific workshop
 * @param addUrl "Add to my calendar" link
 * @returns the shorten and unshorten url versions of the newly created form
 */
const createForm = (data, addUrl) => {
    const { id, name, date, startHour, endHour, speaker, pensum, avaaYear, kindOfWorkshop, platform } = data;
    // adds 30 minutes to the start hour of the workshop
    const [startFormated, endFormated] = getFormatedDate(date, startHour, endHour);
    const start = new Date(startFormated).getTime() - 1800000;
    const formDescription = createFormDescription(data);
    const formCopyId = copyForm(name);
    const form = FormApp.openById(formCopyId);
    const confirmationMessage = createFormConfirmationMessage(addUrl);
    const ss = createSpreadSheetFormResponse(form);
    const theFinalName = setSheetName(ss, name);
    setSheetValues(ss, name, speaker, startHour, date, pensum, avaaYear, kindOfWorkshop, platform);
    form.setDescription(formDescription);
    form.setConfirmationMessage(confirmationMessage);
    form.setTitle(theFinalName);
    //stores the id and the "add to my calendar url"
    form.setCustomClosedFormMessage(id + '-/' + addUrl);
    //creates a trigger 'onFormSubmit' for every form.
    const submitTrigger = createTrigger(form, "submit");
    //
    const uncompleteTrigger = createTrigger(form, "uncomplete", new Date(start));
    const end = new Date(startFormated).getTime() + 1800000;
    const triggersData = {
        submitTrigger,
        uncompleteTrigger,
        end,
        formId: form.getId()
    };
    form.setCustomClosedFormMessage(id + '-/' + addUrl + '-/' + submitTrigger);
    storeFormData(triggersData, submitTrigger);
    storeFormData(triggersData, uncompleteTrigger);
    const formUrl = form.getPublishedUrl();
    const formShortenUrl = form.shortenFormUrl(formUrl);
    /**
     * @see {@link https://stackoverflow.com/questions/63213064/form-responses-spreadsheet-getsheets-doesnt-return-responses-sheet} for reference about using `flush`
     */
    SpreadsheetApp.flush();
    return [formShortenUrl, formUrl, submitTrigger];
};
const setSheetValues = (ss, nameOfTheWorkshop, speaker, hour, date, pensum, year, kindOfWorkshop, platform) => {
    const NAME_CELL = "C2:D2";
    const SPEAKER_CELL = "C3:D3";
    const HOUR_CELL = "C4:D4";
    const KIND_OF_WORKSHOP_CELL = "C5:D5";
    const DATE_CELL = "F2:G2";
    const PENSUM_CELL = "F3:G3";
    const YEAR_CELL = "F4:G4";
    const PLATFORM_CELL = "F5:G5";
    const sheets = ss.getSheets();
    const sheetForRename = sheets.length === 1 ? 0 : sheets.length - 1;
    const actualSheet = sheets[sheetForRename];
    actualSheet.getRange(SPEAKER_CELL).setValue(speaker);
    actualSheet.getRange(NAME_CELL).setValue(nameOfTheWorkshop);
    actualSheet.getRange(HOUR_CELL).setValue(hour);
    actualSheet.getRange(DATE_CELL).setValue(date);
    actualSheet.getRange(PENSUM_CELL).setValue(pensum);
    actualSheet.getRange(YEAR_CELL).setValue(year);
    actualSheet.getRange(KIND_OF_WORKSHOP_CELL).setValue(kindOfWorkshop);
    actualSheet.getRange(PLATFORM_CELL).setValue(platform);
};
/**
 * Creates a confirmation message to the form Confirmation message
 *
 * @param addToMyCalendarLink
 * @returnsthe the confirmation message
 */
const createFormConfirmationMessage = (addToMyCalendarLink) => {
    const confirmationMessage = `!Tus datos se han registrado de manera exitosa!

Si deseas, puedes añadir este evento a tu calendario = ${addToMyCalendarLink}`;
    return confirmationMessage;
};
/**
 * Creates a form template for sending workshops.
 *
 * @returns The id of the newly created form
 */
const createTemplateForm = (destinationFolder) => {
    const form = FormApp.create('Formulario Template Para Talleres');
    form.addTextItem().setTitle('Apellidos').setRequired(true);
    form.addTextItem().setTitle('Nombres').setRequired(true);
    const textValidation = FormApp.createTextValidation().requireTextIsEmail();
    form.addTextItem().setTitle('Correo electrónico').setRequired(true);
    // .setValidation(textValidation)
    //   .setHelpText('Introduce un correo electronico valido')
    const formId = form.getId();
    // form.addTextItem().setTitle('Mes y año de ingreso').setHelpText('Ejemplo: Agosto 2019');
    form.addTextItem().setTitle('Numero de Contacto').setRequired(true);
    form.addTextItem().setTitle('Cedula de Identidad').setRequired(true);
    const file = DriveApp.getFileById(formId);
    file.moveTo(destinationFolder);
    return formId;
};
