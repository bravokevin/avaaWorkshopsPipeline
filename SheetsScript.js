// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
"use strict";
// --------------------------------------------- constants variables ---------------------------------------------
const SHEET_NAME = 'Vista principal de talleres'; // the name of the {sheet} in the specified spreadsheet
/**
 * The start column from where we search for the workshops data
 */
const START_COLUMN = 'C';
/**
 * The end  column from where we search for the workshops data
 */
const END_COLUMN = 'N';
/**
 * the key for storing the scheduled workshop details using {@linkcode scriptProperties}
 */
const SCRIPT_PROPERTIES_WORKSHOPS_KEY = 'CURRENT_WORKSHOPS';
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Gets the active spreadsheet
const sheet = spreadsheet.getSheetByName(SHEET_NAME); //the sheet from where we grab all the data
/**
 * script property service object
 * @type {GoogleAppsScript.Properties.Properties}
 * @see https://developers.google.com/apps-script/guides/properties
 */
const scriptProperties = PropertiesService.getScriptProperties();
/**
 * Resets all the values to default
 *
 * Deletes all script properties
 * restore range in name range
 * Deletes all triggers
 * Deletes all folders
 */
const resetAllValues = () => {
    // scriptProperties.deleteAllProperties();
    const triggers = ScriptApp.getProjectTriggers();
    // const spreadsheetFolderId = scriptProperties.getProperty(SPREADSHEET_FORMS_WORKSHOPS_SUBFOLDER_PROPERTY_KEY);
    // const formsFolderId = scriptProperties.getProperty(FORM_SUBFOLDER_FOR_WORKSHOPS_PROPERTY_KEY);
    // const namedRanges = spreadsheet.getNamedRanges();
    // const namedRange = namedRanges.filter((word) => word.getName() === 'current_workshops');
    // namedRange[0].setRange(sheet.getRange("C9:N9"));
    triggers.forEach(t => {
        ScriptApp.deleteTrigger(t);
    });
    // if ( formsFolderId !== null) {
    //     DriveApp.getFolderById(formsFolderId).getFiles().next().setTrashed(true);
        
    // }
};

/**
 * Cheks if a value is blank
 */
const isBlank = (currentValue) => currentValue[0] === '';
// --------------------------------------------- class/schema for storing workshops details ---------------------------------------------
class Workshop {
    constructor(id, name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, description, avaaYear) {
        this.id = id;
        this.name = name;
        this.pensum = pensum;
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.speaker = speaker;
        this.numberOfParticipants = numberOfParticipants;
        this.kindOfWorkshop = kindOfWorkshop;
        this.platform = platform;
        this.description = description;
        this.avaaYear = avaaYear;
        this.id = id;
        this.name = name;
        this.pensum = pensum;
        this.date = date;
        this.startHour = startHour;
        this.endHour = endHour;
        this.speaker = speaker;
        this.numberOfParticipants = numberOfParticipants;
        this.kindOfWorkshop = kindOfWorkshop;
        this.platform = platform;
        this.description = description;
        this.avaaYear = avaaYear;
    }
}
// --------------------------------------------- functions ---------------------------------------------
/**
 * Grab data from a specifed range of cell whithin a spreadsheet
 *
 * it uses {@linkcode getCurrentRange} to get the range from where we are going to grab all the data
 *
 * @description
 * it gets a two dimensional array, the firts level of the array are all the rows grabed whithin the spreadsheet the second level are all the values that are whithin a specific row
 *
 * @returns  a two dimensional array of all the values grabbed
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
const getWorkshopsDetails = (range) => {
    let rangeName = '';
    if (range === undefined) {
        const [pointOfStart, pointOfEnd] = getCurrentRange();
        rangeName = `${SHEET_NAME}!${START_COLUMN}${pointOfStart + 1}:${END_COLUMN}${pointOfEnd}`;
    }
    else {
        rangeName = range;
    }
    try {
        // Get the values from the spreadsheet using spreadsheetId and the specified range.
        const values = Sheets.Spreadsheets.Values.get(spreadsheet.getId(), rangeName).values;
        //  Print the values from spreadsheet if values are available.
        if (!values) {
            throw new Error('No hay datos para procesar!');
        }
        if (values.every(isBlank)) {
            throw new Error('Todos los campos deben estar llenos');
        }
        return values;
    }
    catch (err) {
        throw new Error(err.message);
    }
};
/**
 * Gets the actual range from where we grab the data using {@linkcode getWorkshopsDetails}
 *
 * It uses the 'named range' feature of Spreadsheet to get the initial point and the {@method getLastRow()} to grab the last row with data in the SpreadSheet
 *
 * @see {@link https://support.google.com/docs/answer/63175?hl=en&co=GENIE.Platform%3DDesktop} for details about named range
 *
 * @returns an array of number with the start and end point
 */
const getCurrentRange = (update = false) => {
    //gets all the named range and search for 'current_workshops'
    const namedRanges = spreadsheet.getNamedRanges();
    const namedRange = namedRanges.filter((word) => word.getName() === 'current_workshops');
    //get the last row with data whithin that range, so we can start from this point 
    const pointOfStart = namedRange[0].getRange().getLastRow();
    //gets the last row with data in it 
    const pointOfEnd = sheet.getLastRow();
    return [pointOfStart, pointOfEnd];
};
/**
 * updates the range of the named range
 *
 * Based on the current range of the named range obtained using {@linkcode getCurrentRange} it updates the range by adding all the rows that contains workshop data, so we can start from an empty row the next time we call {@linkcode getWorkshopsDetails}
 *
 * @notice
 * This function must be called after sending the email with the workshops details, so we can make sure that all the process was done correctly
 */
const updateSheetRange = () => {
    const start = 10;
    const [, pointOfEnd] = getCurrentRange();
    const range = `${SHEET_NAME}!${START_COLUMN}${start}:${END_COLUMN}${pointOfEnd}`;
    const namedRanges = spreadsheet.getNamedRanges();
    const namedRange = namedRanges.filter((word) => word.getName() === 'current_workshops');
    namedRange[0].setRange(sheet.getRange(range));
};
/**
 * stores the scheduled workshops to send that information later
 * @param workshopData -
 * @param scriptPropertiesKey -  the script property key in where all the data would be stored
 * @see https://developers.google.com/apps-script/reference/properties/properties#setProperty(String,String)
 *
 * Due that properties service only store strings, all the array first is parsed to be an object and that object then is parsed to a string with {JSON.stringify}
 *
 */
const storeValues = (workshopData, scriptPropertiesKey) => {
    const dataObject = Object.assign({}, workshopData);
    const jsonData = JSON.stringify(dataObject);
    scriptProperties.setProperty(scriptPropertiesKey, jsonData);
};
/**
 * Converts all the information grabbed by {@linkcode getWorkshopsDetails} and parse into a Workshop object then stores that object in an arr
 * @param values an array with all the workshops details
 * @returns an array of {@linkcode Workshop}
 */
const processData = (values) => {
    const workshops = [];
    values.forEach(value => {
        //@ts-ignore
        workshops.push(new Workshop(...value));
    });
    return workshops;
};
// /**
//  * Determine if a workshop should be scheduled or not based on its type {Workshop.avaaYear}
//  * @param WorkshopData - an array of the class Workshop
//  * @returns  a tupple of the workshops that have to be scheduled and workshops that we can send ASAP
//  */
// const processWorkshopType = (workshopData: Workshop[]): [Workshop[], Workshop[]] => {
//   const scheduledWOrkshops: Workshop[] = [];
//   const workshopsToSendASAP: Workshop[] = []
//   workshopData.forEach(workshop => {
//     if (workshop.avaaYear === "ASAP") {
//       workshopsToSendASAP.push(workshop)
//     }
//     else if (workshop.avaaYear === "Programar") {
//       scheduledWOrkshops.push(workshop);
//     }
//   })
//   return [scheduledWOrkshops, workshopsToSendASAP];
// }
