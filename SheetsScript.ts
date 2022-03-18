const SPREADSHEET_ID = "1qUy-dHm7IOU8VykaR2gRDn-sZwnMfh7Rqj_ktaKIcRg"; // The ID of the master sheet in where all workshops details are visualized

// --------------------------------------------- constants variables ---------------------------------------------
const SHEET_NAME = 'Sheet1'; // the name of the {sheet} in the specified spreadsheet
const START_COLUMN = 'A' // the column in where the range start for looking data
const END_COLUMN = 'L' // the column in where the range end for looking data
const SCRIPT_PROPERTIES_WORKSHOPS_KEY = 'CURRENT_WORKSHOPS' // the key for storing the scheduled workshop details using the "PropertiesServices"

const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID); // the actual spreadsheet object
const sheet = spreadsheet.getSheets()[1]; //the sheet from where we grab all the data

/**
 * script property service class
 * @type {Properties}
 * @see https://developers.google.com/apps-script/guides/properties
 */
const scriptProperties = PropertiesService.getScriptProperties();


const resetAllScriptPropertiesValues = () =>{
  scriptProperties.deleteAllProperties();
}

const isBlank = (currentValue) => currentValue[0] !== ''

// --------------------------------------------- class/schema for storing workshops details ---------------------------------------------
class Workshop {
  constructor(id, name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, description, sendType) {
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
    this.sendType = sendType;
  }
}
// --------------------------------------------- helper functions ---------------------------------------------
/**
 * Grab the information from a specifed range of cell
 * @returns {Array} an array of all the values grabbed
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
 */
const getWorkshopsDetails = () => {
  const [pointOfStart, pointOfEnd] = getCurrentRange();
  const rangeName = `${SHEET_NAME}!${START_COLUMN}${pointOfStart}:${END_COLUMN}${pointOfEnd}`
  try {
    // Get the values from the spreadsheet using spreadsheetId and the specified range.
    const values = Sheets.Spreadsheets.Values.get(SPREADSHEET_ID, rangeName).values;
    //  Print the values from spreadsheet if values are available.
    if (!values) {
      Logger.log('No data found.');
      return;
    }
    if (!values.every(isBlank)) {
      Logger.log('this is basd')
      return
    }
    return values
  } catch (err) {
    Logger.log(err.message);
  }
}
/**
 * Set the actual range from where we grab the data using {getWorkshopsDetails} 
 * @returns {Array<Number>} an array with the start and end point
 */
const getCurrentRange = () => {
  const namedRanges = spreadsheet.getNamedRanges()
  const namedRange = namedRanges.filter(word => word.getName() === 'current_workshops')
  const pointOfStart = namedRange[0].getRange().getLastRow()
  const pointOfEnd = sheet.getLastRow()
  return [pointOfStart, pointOfEnd]
}

const updateSheetRange = () => {
  const [pointOfStart, pointOfEnd] = getCurrentRange();
  const range = `${SHEET_NAME}!${START_COLUMN}${pointOfStart}:${END_COLUMN}${pointOfEnd}`
  const namedRanges = spreadsheet.getNamedRanges();
  namedRanges[0].setRange(sheet.getRange(range))
}


/**
 * stores the scheduled workshops to send that information later
 * @param {JSON<Workshop>}
 * @param {String}
 * @see https://developers.google.com/apps-script/reference/properties/properties#setProperty(String,String)
 */
const storeValues = (values, scriptPropertiesKey) => {
  const processedData = processData(values);
  const dataObject = Object.assign({}, processedData)
  const jsonData = JSON.stringify(dataObject)
  scriptProperties.setProperty(scriptPropertiesKey, jsonData)
}

/**
 * Converts all the information grabbed by {getWorkshopsDetails} and parse into a object then stores that object in an arr
 * @param {Array}
 * @returns {Array<Workshop>} 
 */
const processData = (values) => {
  const workshops = [];
  values.forEach(value => {
    workshops.push(new Workshop(...value))
  })
  return workshops;
}

/**
 * Determine if the workshop needs to be scheduled or not
 * @param {Array<Workshop>}
 * @returns {Array<Workshop>} 
 * @returns {Array<Workshop>} 
 */
const processWorkshopType = (processedWorkshopData) => {
  const scheduledWOrkshops = [];
  const workshopsToSendASAP = []
  processedWorkshopData.forEach(workshop => {
    if (workshop.sendType === "ASAP") {
      workshopsToSendASAP.push(workshop)
    }
    else if (workshop.sendType === "Semanal") {
      scheduledWOrkshops.push(workshop);
    }
  })
  return [scheduledWOrkshops, workshopsToSendASAP];


}